import { Context, FC, createContext, useEffect, useState } from 'react';
import { IAppContext, IAppContextUser, IElementProps, IPost } from 'types/_';

import LS from 'utils/LS';

class AppContextDefault implements IAppContext {
	public user;

	public posts = [];

	public isInited = false;

	constructor(user: IAppContextUser) {
		this.user = user;
	}
}

const ls: IAppContextUser | null = LS.get<IAppContextUser>('user')?.uesr;
const currentUser: IAppContextUser = ls ?? { isAuth: false };

const context: IAppContext = new AppContextDefault(currentUser);

export const AppContext: Context<{
	context: IAppContext;
	setPosts: (posts: IPost[]) => void;
	setUser: (user: IAppContextUser) => void;
	setIsInited: (isInited: boolean) => void;
}> = createContext({
	context,
	setPosts: (posts) => {
		console.log(posts);
	},
	setUser: (user) => {
		console.log(user);
	},
	setIsInited: (isInited) => {
		console.log(isInited);
	},
});

const AppContextProvider: FC<IElementProps> = ({ children }) => {
	const [state, setState] = useState<IAppContext>(
		new AppContextDefault(currentUser),
	);

	useEffect(() => {
		LS.set({ user: state.user });
	}, [state.user]);

	return (
		<AppContext.Provider
			value={{
				context: state,
				setPosts: (posts: IPost[]) => {
					setState({
						...state,
						posts,
					});
				},
				setUser: (user: IAppContextUser) => {
					setState({
						...state,
						user,
					});
				},
				setIsInited: (isInited: boolean) => {
					setState({
						...state,
						isInited,
					});
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
