export interface IPost {
	userId: number;
	id: number;
	title: string;
	desc: string;
	isYou: boolean;
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
