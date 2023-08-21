import { FC, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppContext } from 'components/App/Context';
import PageLayout from 'views/PageLayout.view';
import Home from 'views/Home.view';
import SignIn from 'views/SignIn.view';
import Posts from 'views/Posts.view';
import Post from 'views/Post.view';
import NotFound from 'views/NotFound.view';

const AppRouter: FC = () => {
	const {
		context: {
			user: { isAuth },
		},
	} = useContext(AppContext);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PageLayout />}>
					<Route index element={<Home />} />
					{isAuth ? (
						<>
							<Route path="signin" element={<Navigate to="/posts" />} />
							<Route path="posts" element={<Posts />} />
							<Route path="posts/:id" element={<Post />} />
						</>
					) : (
						<>
							<Route path="signin" element={<SignIn />} />
							<Route path="posts" element={<Navigate to="/signin" />} />
							<Route path="posts/:id" element={<Navigate to="/signin" />} />
						</>
					)}
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
