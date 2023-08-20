import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from 'styles/components/Header.module.scss';
import { AppContext } from './App/Context';

const Header: FC = () => {
	const {
		context: {
			user: { isAuth },
		},
		setUser,
	} = useContext(AppContext);

	const onClickLogoutHandler = () => {
		setUser({ isAuth: false });
	};

	return (
		<header className={styles._}>
			<nav className={styles['nav-group']}>
				<Link to="/">
					<Logo className={styles.logo} />
				</Link>
				{isAuth && (
					<Link to="/posts" className={styles.navlink}>
						Посты
					</Link>
				)}
			</nav>
			<nav className={styles['nav-group']}>
				{isAuth ? (
					<button className={styles.logout} onClick={onClickLogoutHandler}>
						Выйти
					</button>
				) : (
					<Link to="/signin">
						<button className={styles.login}>Войти</button>
					</Link>
				)}
			</nav>
		</header>
	);
};

export default Header;
