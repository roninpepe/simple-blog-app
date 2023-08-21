export interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
	isYou?: boolean;
	comments?: IComment[];
}
export interface IComment {
	id: number;
	name: string;
	email: string;
	body: string;
}

export interface IUser {
	id: number;
	email: string;
	username: string;
}
