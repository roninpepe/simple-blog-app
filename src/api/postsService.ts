import APIConfiguration from 'api/conf';
import { IPostsGetParams, IPostsPatchBody, IPostsPostBody } from 'types/_';
import { EOrder, EPostsSort } from 'enums/_';

export default class PostsService {
	private static route: string = '/posts';

	private static url: string = APIConfiguration.baseUrl + this.route;

	public static async get({
		id,
		sort: _sort = EPostsSort.Time,
		order: _order = EOrder.DESC,
		query: body_like,
		limit: _limit = 10,
		from: _start = 0,
	}: IPostsGetParams = {}): Promise<Response> {
		const params = {
			_sort,
			_order,
			...(body_like && { body_like }),
			_limit,
			_start,
		};
		const searchParams = id
			? `/${id}?${new URLSearchParams({ _embed: 'comments' })}`
			: `?${new URLSearchParams(params as unknown as Record<string, string>)}`;
		const url = this.url + searchParams;
		const response = await fetch(url);
		return response;
	}

	public static async post(body: IPostsPostBody): Promise<Response> {
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

	public static async delete(id: number): Promise<Response> {
		const url = `${this.url}/${id}`;
		const data = { method: 'DELETE' };
		const response = await fetch(url, data);
		return response;
	}

	public static async patch(
		id: number,
		body: IPostsPatchBody,
	): Promise<Response> {
		const url = `${this.url}/${id}`;
		const data = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams(body as unknown as Record<string, string>),
		};
		const response = await fetch(url, data);
		return response;
	}
}
