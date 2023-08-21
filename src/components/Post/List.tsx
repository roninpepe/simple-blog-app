import API from 'api/api';
import { AppContext } from 'components/App/Context';
import Loading from 'components/Loading';
import Post from 'components/Post';
import { EOrder, EPostsSort } from 'enums/api';
import {
	ChangeEventHandler,
	FC,
	MouseEventHandler,
	useContext,
	useEffect,
	useState,
} from 'react';
import styles from 'styles/components/Post.module.scss';
import { IPostListState, IPostsGetParams, IPostsPostBody } from 'types/_';
import PostForm from './Form';

const PostList: FC = () => {
	const [state, setState] = useState<IPostListState>({
		isInited: false,
		isLoading: true,
		posts: [],
		params: { sort: EPostsSort.Time, order: EOrder.DESC, limit: 10, from: 0 },
		totalCount: 0,
	});
	const [isFormOpen, setIsFormOpen] = useState(false);
	const {
		context: {
			user: { id: userId },
		},
	} = useContext(AppContext);

	const toggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	const getPosts = async (params: IPostsGetParams, clear: boolean = false) => {
		const response = await API.posts.get(params);
		const newState: IPostListState = {
			...state,
			isLoading: false,
			isInited: true,
			posts: clear
				? await response.json()
				: [...state.posts, ...(await response.json())],
			totalCount: parseInt(response.headers.get('x-total-count') ?? ''),
			params: {
				...state.params,
				...params,
				from:
					(params.from ?? state.params.from ?? 0) +
					(params.limit ?? state.params.limit ?? 0),
			},
		};
		setState(newState);
	};

	const onChangeSearchHandler: ChangeEventHandler<HTMLInputElement> = async (
		e,
	) => {
		const newParams = {
			...state.params,
			from: 0,
			query: e.target.value,
		};
		const newState = {
			isInited: false,
			isLoading: true,
			posts: [...[]],
			totalCount: 0,
			params: newParams,
		};
		setState(newState);
		await getPosts(newParams, true);
	};
	const onChangeSortHandler: ChangeEventHandler<HTMLSelectElement> = async (
		e,
	) => {
		const newParams = {
			...state.params,
			from: 0,
			sort: e.target.options[e.target.selectedIndex].dataset.sort as EPostsSort,
			order: e.target.options[e.target.selectedIndex].dataset.order as EOrder,
		};
		const newState = {
			isInited: false,
			isLoading: true,
			posts: [...[]],
			totalCount: 0,
			params: newParams,
		};
		setState(newState);
		await getPosts(newParams, true);
	};
	const onChangeLimitHandler: ChangeEventHandler<HTMLSelectElement> = async (
		e,
	) => {
		const newParams = {
			...state.params,
			from: 0,
			limit: +e.target.value,
		};
		const newState = {
			isInited: false,
			isLoading: true,
			posts: [...[]],
			totalCount: 0,
			params: newParams,
		};
		setState(newState);
		await getPosts(newParams, true);
	};
	const onClickLoadMoreHandler: MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		const newState = {
			...state,
			isLoading: true,
		};
		setState(newState);
		await getPosts(state.params, false);
	};

	const deletePost = async (id: number) => {
		const response = await (await API.posts.delete(id)).json();
		if (response)
			setState({
				...state,
				posts: state.posts.filter((post) => id !== post.id),
			});
	};
	const createPost = async (body: IPostsPostBody) => {
		const response = await (await API.posts.post(body)).json();
		if (response)
			setState({
				...state,
				posts: [response, ...state.posts],
			});
		toggleForm();
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};

	useEffect(() => {
		if (!state.isInited) getPosts(state.params);
	}, []);

	return (
		<div className={styles.list}>
			<div className={styles.filers}>
				<input
					className={styles.search}
					type="search"
					value={state.params.query}
					onChange={onChangeSearchHandler}
				/>
				<div className={styles.selectors}>
					<select
						className={styles.select}
						name="sortPosts"
						id="sortPosts"
						onChange={onChangeSortHandler}
					>
						<option value="" disabled>
							Сортировка
						</option>
						<option
							value="new"
							data-sort={EPostsSort.Time}
							data-order={EOrder.DESC}
						>
							Сначала новые
						</option>
						<option
							value="old"
							data-sort={EPostsSort.Time}
							data-order={EOrder.ASC}
						>
							Сначала старые
						</option>
						<option
							value="titleASC"
							data-sort={EPostsSort.Title}
							data-order={EOrder.ASC}
						>
							Тема: А → Я
						</option>
						<option
							value="titleDESC"
							data-sort={EPostsSort.Title}
							data-order={EOrder.DESC}
						>
							Тема: А ← Я
						</option>
						<option
							value="bodyASC"
							data-sort={EPostsSort.Description}
							data-order={EOrder.ASC}
						>
							Текст: А → Я
						</option>
						<option
							value="bodyDESC"
							data-sort={EPostsSort.Description}
							data-order={EOrder.DESC}
						>
							Текст: А ← Я
						</option>
					</select>
					<select
						className={styles.select}
						name="postsPerPage"
						id="postsPerPage"
						onChange={onChangeLimitHandler}
					>
						<option value="" disabled>
							Постов на странице
						</option>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="0">Все</option>
					</select>
				</div>
			</div>
			<div className={styles.posts}>
				{state.isInited ? (
					<>
						{state.posts.map((post) => {
							console.log(post.userId);
							console.log(userId);
							console.log(userId === post.userId);

							return (
								<Post
									post={{ ...post, isYou: post.userId == userId }}
									deletePost={deletePost}
									fromList={true}
									key={post.id}
								/>
							);
						})}
						{state.isLoading ? (
							<Loading />
						) : (
							<button
								disabled={(state.params.from ?? 0) >= (state.totalCount ?? -1)}
								onClick={onClickLoadMoreHandler}
							>
								{(state.params.from ?? 0) >= (state.totalCount ?? -1)
									? 'Сообщений больше нет'
									: 'Загрузить ещё'}
							</button>
						)}
					</>
				) : (
					<Loading />
				)}
			</div>
			<button className={styles['new-post']} onClick={toggleForm}>
				╇
			</button>
			<PostForm
				handleClose={toggleForm}
				state={isFormOpen}
				handleSend={createPost}
			/>
		</div>
	);
};

export default PostList;
