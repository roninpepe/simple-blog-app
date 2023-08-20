import APIConfiguration from 'api/conf';
import { IUsersGetParams, IUsersPostBody } from 'types/_';

export default class UsersService {
	private static route: string = '/uesrs';

	private static url: string = APIConfiguration.baseUrl + this.route;

	public static async get({
		username,
		email,
	}: IUsersGetParams): Promise<Response> {
		const params = {
			...(username && { username_like: `^${username}$` }),
			...(email && { email_like: `^${email}$` }),
		};
		const searchParams = `?${new URLSearchParams(
			params as unknown as Record<string, string>,
		)}`;
		const url = this.url + searchParams;
		const response = await fetch(url);
		return response;
	}

	public static async post(body: IUsersPostBody): Promise<Response> {
		const url = this.url;
		const data = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams(body as unknown as Record<string, string>),
		};
		const response = await fetch(url, data);
		return response;
	}
}
