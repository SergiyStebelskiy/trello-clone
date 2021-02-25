import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "routes";
import MainLayout from "layouts/Main";
import store from "store";
import "./index.scss";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          {routes.map(({ Component, path, exact }, index) => (
            <Route path={path} exact={exact || false} key={index}>
              <MainLayout>{Component}</MainLayout>
            </Route>
          ))}
        </Switch>
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
