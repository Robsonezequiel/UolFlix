import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import GlobalStyle from "../UI/GlobalStyle";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PasswordRecover from "../Pages/PasswordRecover";
import Token from "../Pages/Token";
import PasswordReset from "../Pages/PasswordReset";
import UserInfos from "../Pages/UserInfos";
import PasswordUpdate from "../Pages/PasswordUpdate";
import ListVideo from "../Pages/ListVideo";
import InsertVideo from "../Pages/InsertVideo";
import EditVideo from "../Pages/EditVideo";
import Carousel from "../Components/Carousel/index";
import Player from "../Pages/Player";
import ScrollToTop from "../Components/ScrollToTop";
import { Body } from "./styles";

const Routes = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem("@uolflix:loginToken");
  };

  const hasToken = () => {
    return !!sessionStorage.getItem("@uolflix:forgotPasswordToken");
  };

  const PrivateRoute = ({
    loggedRoute,
    passwordRoute,
    component: Component,
    ...rest
  }) => (
    <>
      {loggedRoute ? (
        <Route
          {...rest}
          render={props =>
            isAuthenticated() ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{ pathname: "/Login", state: { from: props.location } }}
              />
            )
          }
        />
      ) : (
        <Route
          {...rest}
          render={props =>
            isAuthenticated() ? (
              <Redirect
                to={{ pathname: "/ListVideo", state: { from: props.location } }}
              />
            ) : (
              <>
                {passwordRoute ? (
                  <>
                    {hasToken() ? (
                      <Component {...props} />
                    ) : (
                      <Redirect
                        to={{
                          pathname: "/PasswordRecover",
                          state: { from: props.location },
                        }}
                      />
                    )}
                  </>
                ) : (
                  <Component {...props} />
                )}
              </>
            )
          }
        />
      )}
    </>
  );

  const DefaultRoute = ({
    loggedComponent: LoggedComponent,
    component: Component,
    ...rest
  }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <LoggedComponent {...props} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );

  return (
    <Body display="flex" direction="column">
      <GlobalStyle />
      <Router>
        <ScrollToTop />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/Login" component={Login} />
          <PrivateRoute path="/Register" component={Register} />
          <PrivateRoute path="/PasswordRecover" component={PasswordRecover} />
          <PrivateRoute path="/Token" component={Token} passwordRoute />
          <PrivateRoute
            path="/PasswordReset"
            component={PasswordReset}
            passwordRoute
          />
          <PrivateRoute path="/UserInfos" component={UserInfos} loggedRoute />
          <PrivateRoute
            path="/PasswordUpdate"
            component={PasswordUpdate}
            loggedRoute
          />
          <PrivateRoute path="/ListVideo" component={ListVideo} loggedRoute />
          <PrivateRoute
            path="/InsertVideo"
            component={InsertVideo}
            loggedRoute
          />
          <PrivateRoute path="/EditVideo" component={EditVideo} loggedRoute />
          <PrivateRoute path="/Player" component={Player} loggedRoute />
          <PrivateRoute path="/Carousel" component={Carousel} loggedRoute />
          <DefaultRoute path="*" component={Home} loggedComponent={ListVideo} />
        </Switch>
      </Router>
    </Body>
  );
};

export default Routes;
