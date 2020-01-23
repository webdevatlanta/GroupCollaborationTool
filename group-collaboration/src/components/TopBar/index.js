import React, { useContext } from "react";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

import { useHistory, Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import * as STYLES from "../../constants/styles";
import { SessionContext } from "../Session";
import NameTag from "./nametag";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    transition: ".3s"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  titleLink: {
    color: theme.palette.common.white,
    textDecoration: "none"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${STYLES.DRAWER_WIDTH}px)`,
    marginLeft: STYLES.DRAWER_WIDTH,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

export default function(props) {
  const session = useContext(SessionContext);
  const history = useHistory();

  const classes = useStyles();

  const handleSignIn = event => {
    history.push(ROUTES.SIGN_IN);
  };

  const handleDrawerOpen = () => {
    props.setDrawerOpen(!props.drawerOpen);
  };

  const renderAppBar = (
    <AppBar
      position="static"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.drawerOpen
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          style={props.drawerOpen ? { opacity: 0 } : { opacity: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          <Link to={ROUTES.LANDING} className={classes.titleLink}>
            Groopa
          </Link>
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <div className={classes.grow} />
        <div>
          {!session && (
            <Button color="inherit" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
          {session && <NameTag />}
        </div>
      </Toolbar>
    </AppBar>
  );

  return <div className={classes.grow}>{renderAppBar}</div>;
}
