import { Context, FC, createContext, useState } from 'react';
import { IAppContext, IAppContextUser, IElementProps } from 'types/_';

import LS from 'utils/LS';

class AppContextDefault implements IAppContext {
	public user;

	constructor(user: IAppContextUser) {
		this.user = user;
	}
}

const ls: IAppContextUser | null = LS.get<IAppContextUser>('user').user;
const currentUser: IAppContextUser = ls ?? { isAuth: false };

const context: IAppContext = new AppContextDefault(currentUser);

export const AppContext: Context<{
	context: IAppContext;
	setUser: (user: IAppContextUser) => void;
}> = createContext({
	context,
	setUser: (user) => {
		console.log(user);
	},
});

const AppContextProvider: FC<IElementProps> = ({ children }) => {
	const [state, setState] = useState<IAppContext>(
		new AppContextDefault(currentUser),
	);

	return (
		<AppContext.Provider
			value={{
				context: state,
				setUser: (user: IAppContextUser) => {
					setState({
						...state,
						user,
					});
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
