import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const Nav = (): JSX.Element => {
  const { logout, user } = useAuth();
  if (!user) {
    return <></>;
  }
  return (
    <div>
      <Link to="/">Dashboard</Link>
      <Link to="/library">My Library</Link>
      <Link to="/analyses">My Analyses</Link>
      <Link to="/pacs">PACS</Link>
      <Link to="/create-new-analysis">Create New Analysis</Link>
      <button type="button" onClick={logout}>
        Log Out
      </button>
    </div>
  );
};

export default Nav;
