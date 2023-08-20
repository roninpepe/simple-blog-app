import APIConfiguration from 'api/conf';
import PostsService from 'api/postsService';
import UsersService from 'api/usersService';

export default class API extends APIConfiguration {
	public static posts = PostsService;

	public static users = UsersService;
}
