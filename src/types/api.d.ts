import { EPostsSort, EOrder } from 'enums/_';

export interface IAPIConfiguration {
	baseURL: string;
}

export interface IPostsGetParams {
	id?: number;
	sort?: EPostsSort;
	order?: EOrder;
	query?: string;
	limit?: number;
	from?: number;
}
export interface IPostsPostBody {
	userId: number;
	title: string;
	body: string;
}
export interface IPostsPatchBody {
	title?: string;
	body?: string;
}

export interface IUsersGetParams {
	username?: string;
	email?: string;
}
export interface IUsersPostBody {
	username: string;
	email: string;
}
