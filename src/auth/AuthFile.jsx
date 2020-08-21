import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SignIn from "../components/Signin.jsx";
import SignUp from "../components/Signup.jsx";

const AuthFile = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth">
          <Redirect to="/auth/signin" />
        </Route>
        <Route exact path="/auth/signup" component={SignUp} />
        <Route exact path="/auth/signin" component={SignIn} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  );
}

export default AuthFile;