
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dashboard from './Dashboard.jsx';
import UsersTable from './Users.jsx';
import SignIn from './Signin.jsx';
import SignUp from "./Signup.jsx";
import { PrivateRoute } from "../auth/ProtectedRoute.jsx";

const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" component={Dashboard} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;