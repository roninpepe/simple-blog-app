import API from 'api/api';
import Error from 'components/Error';
import Loading from 'components/Loading';
import PostItem from 'components/Post';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPostState } from 'types/_';

const Post: FC = () => {
	const { id } = useParams();
	const [loadingState, setLoadingState] = useState<IPostState>({
		isLoading: true,
	});

	const getPost = async (postId: number) => {
		const data = await (await API.posts.get({ id: postId })).json();
		setLoadingState({
			isLoading: false,
			...(data.id && { postData: data }),
		});
	};

	useEffect(() => {
		if (id) getPost(parseInt(id));
	}, []);

	return loadingState.isLoading ? (
		<Loading />
	) : loadingState.postData ? (
		<PostItem post={loadingState.postData} />
	) : (
		<Error message="Пост не найден" />
	);
};

export default Post;
