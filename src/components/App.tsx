import { FC, StrictMode, useEffect } from 'react';
import logo from 'assets/icons/logo.svg';
import styles from 'styles/components/App.module.scss';

import API from 'api/api';

const App: FC = () => {
	useEffect(() => {
		API.users.get({});
	}, []);
	return (
		<StrictMode>
			<div className={styles._}>
				<header className={styles.header}>
					<img src={logo} className={styles.logo} alt="logo" />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<a
						className={styles.link}
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header>
			</div>
		</StrictMode>
	);
};

export default App;
