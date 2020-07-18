import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {BrowserRouter, Link, Route, Switch, withRouter} from "react-router-dom";

const NavBar = () => {
    // When the URL is changed, but via tab selection, and not page reload, then update highlighted tab
    const [value, setValue] = useState(0);
    const handlePageChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        // Current URL
        let path = window.location.pathname;
        if (path === "/" && value !== "/") {
            setValue("/");
        }
        else if (path === "/about" && value !== "/about") {
            setValue("/about");
        }
        else if (path === "/projects" && value !== "/projects") {
            setValue("/projects");
        }
    }, [value,]);

    // Content
    return(
  <div className="NavBar">
      <AppBar style={{background: "#363636"}} position={"fixed"}>
          <Toolbar>
              <Tabs value={window.location.pathname} onChange={handlePageChange}>
                  <Tab label={"Home"} value={"/"} component={Link} to={"/"}/>
                  <Tab label={"About Me"} value={"/about"} component={Link} to={"/about"}/>
                  <Tab label={"Projects"} value={"/projects"} component={Link} to={"/projects"}/>
              </Tabs>
              <Typography style={{marginLeft: "auto", fontSize: 1.1 + "em"}} variant={"subtitle2"}>
                  Jason James
              </Typography>
          </Toolbar>
      </AppBar>
  </div>
)};

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
