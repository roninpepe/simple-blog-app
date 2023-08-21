import { FC } from 'react';
import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import styles from 'styles/components/Loading.module.scss';

const Loading: FC = () => {
	return (
		<div className={styles._}>
			<Loader className={styles.loader} />
		</div>
	);
};

export default Loading;
