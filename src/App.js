import React, { useContext, useState } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import ForgotPasswordPage from "./components/ForgotPassword";
import ProfileViewer from "./components/ProfileViewer";
import ProfileEditor from "./components/ProfileEditor";
import LandingPage from "./components/Landing";
import NewProjectPage from "./components/NewProject";
import ProjectViewer from "./components/ProjectViewer";
import ProjectEditor from "./components/ProjectEditor";
import NavDrawer from "./components/NavDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { SessionContext } from "./components/Session";
import { FirebaseContext } from "./components/Firebase";
import { useAuthUser } from "./components/Provider";
import * as ROUTES from "./constants/routes";
import * as STYLES from "./constants/styles";

import "./App.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: STYLES.DRAWER_WIDTH
  }
}));

export default function() {
  const provider = useContext(FirebaseContext);
  const authUser = useAuthUser(provider);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const classes = useStyles();

  return (
    <SessionContext.Provider value={authUser}>
      <div className={classes.root}>
        <CssBaseline />
        <Router>
          <TopBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          <NavDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: drawerOpen
            })}
          >
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
              path={ROUTES.FORGOT_PASSWORD}
              component={ForgotPasswordPage}
            />
            <Route exact path={ROUTES.EDIT_PROFILE} component={ProfileEditor} />
            <Route path={ROUTES.VIEW_PROFILE} component={ProfileViewer} />
            <Route exact path={ROUTES.VIEW_PROJECT} component={ProjectViewer} />
            <Route exact path={ROUTES.NEW_PROJECT} component={NewProjectPage} />

            <Route exec path={ROUTES.EDIT_PROJECT} component={ProjectEditor} />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
          </main>
        </Router>
      </div>
    </SessionContext.Provider>
  );
}
