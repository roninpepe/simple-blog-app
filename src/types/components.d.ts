import { ReactNode } from 'react';
import { IComment, IPost } from 'types/_';

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
	posts: IPost[];
	isInited: boolean;
}

/* props */

export interface IPostsProps extends IElementProps {
	notes: IPost[];
}
export interface IPostProps extends IElementProps {
	note: IPost;
}
export interface ICommentsProps extends IElementProps {
	comments: IComment[];
}
export interface ICommentProps extends IElementProps {
	comment: IComment;
}

/* state */

export interface INoteState {
	message: string;
	edit: boolean;
}
