import { FC, MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import Comment from 'components/Comment';
import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import { IPostProps } from 'types/_';
import styles from 'styles/components/Post.module.scss';

const Post: FC<IPostProps> = ({
	post: { id, isYou, title, body, comments },
	fromList,
	deletePost,
}) => {
	const [isDeletingInProgress, setIsDeletingInProgress] = useState(false);
	const onClickDeleteHandler: MouseEventHandler<HTMLButtonElement> = () => {
		if (deletePost) {
			setIsDeletingInProgress(true);
			deletePost(id);
		}
	};

	return (
		<div className={styles._}>
			<div className={styles.op}>
				<div className={styles.header}>
					<span className={styles.number}>
						{<Link to={'/posts/' + id}>{id}.</Link>}
					</span>
					{isYou && <span className={styles.you}>(You)</span>}
					<span className={styles.title}>{title}</span>
				</div>
				<div className={styles.body}>{body}</div>
				{fromList && (
					<div className={styles.actions}>
						<Link to={'/posts/' + id}>
							<button>Открыть</button>
						</Link>
						{isYou && (
							<button
								onClick={onClickDeleteHandler}
								disabled={isDeletingInProgress}
							>
								{isDeletingInProgress ? <Loader /> : 'Удалить'}
							</button>
						)}
					</div>
				)}
			</div>
			{comments?.map((comment) => (
				<Comment comment={comment} key={comment.id} />
			))}
		</div>
	);
};

export default Post;
