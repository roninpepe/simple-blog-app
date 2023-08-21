import { FC } from 'react';
import styles from 'styles/components/Error.module.scss';
import { IErrorProps } from 'types/components';

const Error: FC<IErrorProps> = ({ message }) => {
	return (
		<div className={styles._}>
			<h2 className={styles.icon}>⊘</h2>
			<h3 className={styles.message}>{message}</h3>
		</div>
	);
};

export default Error;
