import { FC } from 'react';
import { ICommentProps } from 'types/components';
import styles from 'styles/components/Post.module.scss';

const Comment: FC<ICommentProps> = ({ comment: { id, name, email, body } }) => {
	return (
		<div className={styles.comment}>
			<div className={styles.header}>
				<span className={styles.number}>{<span>{id}.</span>}</span>
				{email ? (
					<a href={'mailto:' + email} className={styles.name}>
						{name}
					</a>
				) : (
					<span className={styles.name}>{name}</span>
				)}
			</div>
			<div className={styles.body}>{body}</div>
		</div>
	);
};

export default Comment;
