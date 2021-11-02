import useAuth from "../../hooks/useAuth";

import styles from "./style.module.css";

const Nav = (): JSX.Element => {
  const { logout } = useAuth();
  return (
    <div className={styles["w-full"]}>
      <button type="button" onClick={logout}>
        Log Out
      </button>
      <button type="button" onClick={logout}>
        Log In
      </button>
    </div>
  );
};

export default Nav;
