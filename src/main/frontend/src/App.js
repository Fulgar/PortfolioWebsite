import React, {useEffect, useState} from 'react';
import './App.css';
import Homepage from "./components/Homepage/Homepage";
import NavBar from "./components/NavBar/NavBar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";
import AboutMe from "./components/AboutMe/AboutMe";
import Projects from "./components/Projects/Projects";
import {Button, createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline"
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import AdminConsole from "./components/AdminConsole/AdminConsole";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#242F40"
        },
        secondary: {
            main: "#CCA43B"
        },
        error: {
            main: "#FF0000"
        },
        background: {
            paper: "#E5E5E5",
            default: "#242F40"
        },
        text: {
          primary: "#242F40"
        },
        divider: "#242F40"
    },
    overrides: {
        MuiDivider: {
            root: {
                marginTop: 1 + "em",
                marginBottom: 1 + "em"
            }
        }

    }
});

function App() {
    // Admin Authorization
    const [authorizedAdmin, setAuthorizedAdmin] = useState(false);

    function handleAuthChange(newValue) {
        setAuthorizedAdmin(newValue);
    }

    return (
        <div className="App">
            <Router>
                <MuiThemeProvider theme={ theme }>
                    <CssBaseline/>
                    <NavBar/>
                    <div className={ "main-body" }>
                        <Switch>
                            <Route path={ "/about" }>
                                <AboutMe/>
                            </Route>

                            <Route exact path={ "/projects" }>
                                <Projects/>
                            </Route>

                            <Route path={ `/projects/:projectID` } render={(props) => {
                                return <ProjectPage projectID={props.match.params.projectID}/>
                            }}/>

                            <Route exact path={ "/admin" }>
                                {
                                    authorizedAdmin
                                        ? <Redirect to={"/admin/view"}/>
                                        : <AdminLogin authorizedAdmin={authorizedAdmin} onChange={(newValue) => handleAuthChange(newValue)}
                                    />
                                }
                            </Route>

                            <PrivateRoute path={ "/admin/view" } authorizedAdmin={authorizedAdmin} component={ AdminConsole }/>

                            <Route exact path={ "/" }>
                                <Homepage/>
                            </Route>

                            <Route>
                                <Typography color={"secondary"} variant={"h6"}>Unknown Page URL</Typography>
                            </Route>
                        </Switch>
                    </div>
                </MuiThemeProvider>
            </Router>
        </div>
  );
}

export default App;
