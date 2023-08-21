import {
	ChangeEventHandler,
	FC,
	FormEventHandler,
	useContext,
	useState,
} from 'react';
import ReactModal from 'react-modal';
import { AppContext } from 'components/App/Context';
import { IPostsPostBody } from 'types/api';
import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import styles from 'styles/components/PostForm.module.scss';

const PostForm: FC<{
	state: boolean;
	handleClose: () => void;
	handleSend: (body: IPostsPostBody) => Promise<void>;
	children?: JSX.Element;
}> = ({ state, handleClose, handleSend }) => {
	const {
		context: {
			user: { id },
		},
	} = useContext(AppContext);
	const [titleValue, setTitleValue] = useState('');
	const [bodyValue, setBodyValue] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const onTitleInputChangeHandler: ChangeEventHandler<HTMLInputElement> = ({
		target,
	}) => {
		setTitleValue(target.value);
	};
	const onBodyInputChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = ({
		target,
	}) => {
		setBodyValue(target.value);
	};
	const onFormSubmitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		setIsSubmitted(true);
		console.log(id);

		if (id)
			await handleSend({ userId: id, title: titleValue, body: bodyValue });
		setBodyValue('');
		setTitleValue('');
		setIsSubmitted(false);
	};

	return (
		<ReactModal
			isOpen={state}
			onRequestClose={handleClose}
			className={styles.content}
			overlayClassName={styles.overlay}
		>
			<form name="post" onSubmit={onFormSubmitHandler} className={styles._}>
				<input
					type="text"
					required
					title="Title"
					className={styles.field}
					disabled={isSubmitted}
					name="title"
					value={titleValue}
					onChange={onTitleInputChangeHandler}
				/>
				<textarea
					required
					title="Message"
					className={styles.textarea}
					disabled={isSubmitted}
					name="body"
					value={bodyValue}
					onChange={onBodyInputChangeHandler}
				/>
				<button type="submit" disabled={isSubmitted}>
					{isSubmitted ? <Loader /> : 'Отправить'}
				</button>
			</form>
			<button className={styles.close} onClick={handleClose}>
				Закрыть
			</button>
		</ReactModal>
	);
};

export default PostForm;
