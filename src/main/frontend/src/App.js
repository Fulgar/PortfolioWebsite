import React from 'react';
import './App.css';
import Homepage from "./components/Homepage/Homepage";
import NavBar from "./components/NavBar/NavBar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AboutMe from "./components/AboutMe/AboutMe";
import Projects from "./components/Projects/Projects";
import {Button, createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline"
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import ProjectPage from "./components/ProjectPage/ProjectPage";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#242F40"
        },
        secondary: {
            main: "#CCA43B"
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

                        <Route exact path={ "/" }>
                            <Homepage/>
                        </Route>

                        <Route>
                            <b style={{fontSize: 2 + 'em'}}>Unknown page URL</b>
                        </Route>
                    </Switch>
                </div>
            </MuiThemeProvider>
        </Router>
    </div>
  );
}

export default App;
