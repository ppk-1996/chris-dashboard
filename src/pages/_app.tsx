import { ReactElement } from "react";
import { Switch } from "react-router";

import { PrivateRoute, PublicRoute } from "../components/Routes";

import Home from "./home";
import LogIn from "./login";
import SignUp from "./signup";

function App(): ReactElement {
  return (
    <Switch>
      <PublicRoute exact path="/login">
        <LogIn />
      </PublicRoute>
      <PublicRoute exact path="/signup">
        <SignUp />
      </PublicRoute>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
