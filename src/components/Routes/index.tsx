import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const PublicRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { user } = useAuth();
  if (!user) return <Route {...props} />;
  return <Redirect to="/" />;
};
const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { user } = useAuth();
  const { location } = props;
  if (user) return <Route {...props} />;

  return <Redirect to={`/login?then=${location?.pathname}`} />;
};

export { PrivateRoute, PublicRoute };
