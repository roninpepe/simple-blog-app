import { ReactNode } from 'react';
import { IComment, IPost, IPostsGetParams } from 'types/_';

/* main */

export interface IElementProps {
	children?: ReactNode;
	className?: string;
	key?: string | number;
}

export type StateUpdater<State> = (newState: Partial<State>) => void;

/* context */

export interface IAppContextUser {
	isAuth: boolean;
	id?: number;
}

export interface IAppContext {
	user: IAppContextUser;
}

/* props */

export interface IPostsProps extends IElementProps {
	posts: IPost[];
}
export interface IPostProps extends IElementProps {
	post: IPost;
	fromList?: boolean;
	deletePost?: (id: number) => void;
}
export interface ICommentProps extends IElementProps {
	comment: IComment;
}
export interface IErrorProps extends IElementProps {
	message: string;
}

/* state */

export interface IPostState {
	isLoading: boolean;
	postData?: IPost;
}
export interface IPostListState {
	isInited: boolean;
	isLoading: boolean;
	posts: IPost[];
	params: IPostsGetParams;
	totalCount?: number;
}
