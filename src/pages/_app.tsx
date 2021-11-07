import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Switch } from "react-router";

import Wrapper from "../components/Layout";
import Nav from "../components/Navigation";
import { PrivateRoute, PublicRoute } from "../components/Routes";

import Analyses from "./analyses";
import AnalysisCatalog from "./analysis-catalog";
import AnalysisDetail from "./analysis-detail";
import CreateNewAnalysis from "./create-new-analysis";
import Dashboard from "./dashboard";
import Library from "./library";
import LogIn from "./login";
import PACS from "./pacs";
import SignUp from "./signup";

const queryClient = new QueryClient();
function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Switch>
          <PublicRoute exact path="/login" component={LogIn} />
          <PublicRoute exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/library" component={Library} />
          <PrivateRoute exact path="/pacs" component={PACS} />
          <PrivateRoute exact path="/analyses" component={Analyses} />
          <PrivateRoute
            exact
            path="/analyses/:slug"
            component={AnalysisDetail}
          />
          <PrivateRoute
            exact
            path="/analysis-catalog"
            component={AnalysisCatalog}
          />
          <PrivateRoute
            exact
            path="/create-new-analysis"
            component={CreateNewAnalysis}
          />
        </Switch>
      </Wrapper>
    </QueryClientProvider>
  );
}

export default App;
