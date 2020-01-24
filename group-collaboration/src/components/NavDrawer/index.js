import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FirebaseContext } from "../Firebase";
import { SessionContext } from "../Session";

import * as ROUTES from "../../constants/routes.js";
import * as STYLES from "../../constants/styles.js";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: STYLES.DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: STYLES.DRAWER_WIDTH
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

export default function(props) {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const session = useContext(SessionContext);
  const theme = useTheme();
  const history = useHistory();

  const handleDrawerClose = () => {
    props.setDrawerOpen(false);
  };

  const handleAccountSelected = () => history.push(ROUTES.EDIT_PROFILE);
  const handleProjectsSelected = () => history.push(ROUTES.LANDING);
  const handleSignoutClicked = () =>
    firebase.doSignOut().then(() => history.push(ROUTES.LANDING));
  const handleSigninClicked = () => history.push(ROUTES.SIGN_IN);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.drawerOpen}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText
            primary="Account"
            onClick={handleAccountSelected}
          ></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="Projects"
            onClick={handleProjectsSelected}
          ></ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        {session && (
          <ListItem button>
            <ListItemText
              primary="Sign Out"
              onClick={handleSignoutClicked}
            ></ListItemText>
          </ListItem>
        )}
        {!session && (
          <ListItem button>
            <ListItemText
              primary="Sign In"
              onClick={handleSigninClicked}
            ></ListItemText>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}
