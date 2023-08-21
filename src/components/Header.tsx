import { FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from './App/Context';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import styles from 'styles/components/Header.module.scss';
import LS from 'utils/LS';

const Header: FC = () => {
	const {
		context: {
			user: { isAuth },
		},
		setUser,
	} = useContext(AppContext);

	const { pathname } = useLocation();

	const onClickLogoutHandler = () => {
		const user = { isAuth: false };
		setUser(user);
		LS.set({ user });
	};

	return (
		<header className={styles._}>
			<nav className={styles['nav-group']}>
				<Link to="/" className={styles['logo-link']}>
					<Logo className={styles.logo} />
				</Link>
				{isAuth && (
					<Link
						to="/posts"
						className={[
							styles['nav-link'],
							pathname === '/posts' && styles['nav-link_active'],
						].join(' ')}
					>
						Посты
					</Link>
				)}
			</nav>
			<nav className={styles['nav-group']}>
				<span className={styles['nav-item-wrap']}>
					{isAuth ? (
						<button className={styles.logout} onClick={onClickLogoutHandler}>
							Выйти
						</button>
					) : (
						<Link to="/signin">
							<button className={styles.login}>Войти</button>
						</Link>
					)}
				</span>
			</nav>
		</header>
	);
};

export default Header;
