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
import { ProviderContext } from "../Provider";
import { SessionContext } from "../Session";
import { NavLink } from "react-router-dom";

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
  const provider = useContext(ProviderContext);
  const session = useContext(SessionContext);
  const theme = useTheme();
  const history = useHistory();

  const handleDrawerClose = () => {
    props.setDrawerOpen(false);
  };

  const handleAccountSelected = () => history.push(ROUTES.EDIT_PROFILE);
  const handleProjectsSelected = () => history.push(ROUTES.LANDING);

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
          <NavLink exact activeClassName="active" to={ROUTES.EDIT_PROFILE}>
            <ListItemText
              primary="Account"
              onClick={handleAccountSelected}
            ></ListItemText>
          </NavLink>
        </ListItem>
        <ListItem button>
          <NavLink exact activeClassName="active" to={ROUTES.LANDING}>
            <ListItemText
              primary="Projects"
              onClick={handleProjectsSelected}
            ></ListItemText>
          </NavLink>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}
