import { Link } from "react-router-dom";

const Dashboard = (): JSX.Element => (
  <div>
    <h1>Overview</h1>
    <Link to="/library">Go To My Library</Link>
    <Link to="/analyses">Go To My Analyses</Link>
    <Link to="/pacs">Query PACS</Link>
    <Link to="/create-new-analysis">Create New Analysis</Link>
  </div>
);

export default Dashboard;
