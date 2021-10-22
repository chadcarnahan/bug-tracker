import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DbProvider } from "./contexts/DbContext";

import SideBar from "./components/Sidebar/SideBar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import PrivateRoute from "./components/PrivateRoute";
import EditIssue from "./components/Issue/editIssue/EditIssue";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <DbProvider>
            <PrivateRoute exact path="/" component={SideBar} />
            <PrivateRoute exact path="/login" component={SideBar} />
            <PrivateRoute exact path="/signup" component={SideBar} />

            <PrivateRoute exact path="/issue/:id" component={EditIssue} />
          </DbProvider>
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
