import React from 'react';
import logo from './logo.svg';
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

function App() {
  return (
    <div className="App">
        <header className={ "top-nav" }>
            <NavBar/>
        </header>
        <Router>
            <div className={ "main-body" }>
                <Switch>
                    <Route path={ "/about" }>
                        <AboutMe/>
                    </Route>
                    <Route path={ "/projects" }>
                        <Projects/>
                    </Route>
                    <Route exact path={ "/" }>
                        <Homepage/>
                    </Route>
                    <Route>
                        <b style={{fontSize: 2 + 'em'}}>Unknown page URL</b>
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
