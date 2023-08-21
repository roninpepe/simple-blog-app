import {
	ChangeEventHandler,
	FC,
	FormEventHandler,
	useContext,
	useState,
} from 'react';
import { AppContext } from 'components/App/Context';
import API from 'api/api';
import LS from 'utils/LS';
import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import styles from 'styles/components/SignInForm.module.scss';

const SignInForm: FC = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [emailValue, setEmailValue] = useState('');

	const { setUser } = useContext(AppContext);

	const signUpNewUser = async (email: string) => {
		const { id } = await (await API.users.post({ email })).json();
		return id;
	};

	const signInUser = async (email: string) => {
		const [existedUser] = await (await API.users.get({ email })).json();
		let user;
		if (existedUser) {
			user = { isAuth: true, id: existedUser.id };
		} else user = { isAuth: true, id: await signUpNewUser(email) };
		setUser(user);
		LS.set({ user });
	};

	const onEmailInputChangeHandler: ChangeEventHandler<HTMLInputElement> = ({
		target,
	}) => {
		setEmailValue(target.value);
	};
	const onFormSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setIsSubmitted(true);
		signInUser(emailValue);
	};

	return (
		<form name="signin" onSubmit={onFormSubmitHandler} className={styles._}>
			<input
				type="text"
				required
				pattern="(?:\w|[.\-])+@(?:\w+\.)+\w{2,}"
				placeholder="john.doe@example.com"
				title="email: john.doe@example.com"
				className={styles.field}
				disabled={isSubmitted}
				name="email"
				value={emailValue}
				onChange={onEmailInputChangeHandler}
			/>
			<button type="submit" disabled={isSubmitted}>
				{isSubmitted ? <Loader /> : 'Войти'}
			</button>
		</form>
	);
};

export default SignInForm;
