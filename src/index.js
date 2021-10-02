import React from "react";
import ReactDOM from "react-dom";
import AddQuestion from "./components/AddQuestion";
import Solve from "./components/Solve";
import SolveKind from "./components/SolveKind";
import Summary from "./components/Summary";

import "./index.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return <Router>
    <Switch>
      <Route path="/add-question">
        <AddQuestion />
      </Route>
      <Route path="/summary">
        <Summary />
      </Route>
      <Route path="/test-kind">
        <SolveKind />
      </Route>
      <Route path="/">
        <Solve />
      </Route>
    </Switch>
  </Router>;
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
