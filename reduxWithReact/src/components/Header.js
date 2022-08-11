import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { authActions } from "../store";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  }

  const Navigation = () => {
    return (
      <nav>
        <ul>
          <li>
            <a href="/">My Products</a>
          </li>
          <li>
            <a href="/">My Sales</a>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <header className={styles.header}>
      <h1>Redux Auth</h1>
      {isAuth && <Navigation />} 
    </header>
  );
};

export default Header;
