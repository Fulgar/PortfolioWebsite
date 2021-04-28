import React from 'react';
import './Homepage.css';
import portrait from "../../images/JacketTie1.jpg"
import linkedLogo from "../../images/social-media-logos/linkedinLogo.png"
import githubLogo from "../../images/social-media-logos/githubLogo.png"
import reactLogo from "../../images/tech-logos/reactLogo.png"
import angularLogo from "../../images/tech-logos/angularLogo.png"
import javaLogo from "../../images/tech-logos/javaLogo.png"
import wildflyLogo from "../../images/tech-logos/wildflyLogo.png"
import jsLogo from "../../images/tech-logos/jsLogo.png"
import pythonLogo from "../../images/tech-logos/pythonLogo.png"
import cppLogo from "../../images/tech-logos/cppLogo.jpg"
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {isMobile} from 'react-device-detect';

const Homepage = () => (
    <div className="Homepage">
        <div className={!isMobile ? "main-content" : "mobile-main-content"}>
            <Paper variant={"outlined"} style={{
                borderColor: "#CCA43B", borderWidth: 0.40 + "em", padding: 3 + "em"
            }}>
                <img className={"portrait-img"} src={portrait} alt={"Jason James"}/>
                <Typography style={{paddingTop: 1 + "em", paddingBottom: 1 + "em"}} variant={"h3"}>
                    {!isMobile ? "Jason James" : "Mobile James"}
                </Typography>

                <Paper style={{margin: 1 + "em", display: "flex", alignItems: "center", minWidth: 150 + "px"}} elevation={10}>
                    <Typography variant={"subtitle1"}>
                        Career Status: Currently Employed
                    </Typography>
                </Paper>

                <Paper style={{margin: 1 + "em", display: "flex", alignItems: "center", minWidth: 150 + "px"}} elevation={10}>
                    <img className={"social-media-logo"} src={githubLogo} alt={"Github Profile Page"}/>
                    <a href={"https://github.com/Fulgar"}>
                        <Typography variant={"subtitle1"}>
                            Github Profile
                        </Typography>
                    </a>
                </Paper>

                <Paper style={{margin: 1 + "em", display: "flex", alignItems: "center", minWidth: 150 + "px"}} elevation={10}>
                    <img className={"social-media-logo"} src={linkedLogo} alt={"LinkedIn Profile Page"}/>
                    <a href={"https://www.linkedin.com/in/jason-james-011762146/"}>
                        <Typography variant={"subtitle1"}>
                            LinkedIn Profile
                        </Typography>
                    </a>
                </Paper>

                <Paper style={{margin: 1 + "em", display: "flex", alignItems: "center", minWidth: 150 + "px"}} elevation={10}>
                    <Typography variant={"body2"}>
                        Professional Email: jjames541907@gmail.com
                    </Typography>
                </Paper>

                <Paper style={{margin: 1 + "em", display: "flex", alignItems: "center", minWidth: 150 + "px"}} elevation={10}>
                    <Typography variant={"subtitle1"}>
                        Resume: <a href={"https://jasonjamescodes.surge.sh/Resume/Resume.pdf"}>Link</a>
                    </Typography>
                </Paper>

            </Paper>

            <div className={!isMobile ? "right-content" : "mobile-bottom-content"}>
                <Typography style={{paddingBottom: 2 + "em"}} color={"secondary"} variant={"h2"}>
                    Hello World
                    <br/><br/>
                    My name is Jason James
                </Typography>

                <Button variant={"contained"} color={"secondary"} href={"/about"} style={{
                    maxWidth: 20 + "em", marginLeft: "auto", marginRight: "auto"
                }}>
                    <Typography variant={"h3"}>About Me</Typography>
                </Button>

                <br/><br/>
                <Button variant={"contained"} color={"secondary"} href={"/projects"} style={{
                    maxWidth: 20 + "em", marginLeft: "auto", marginRight: "auto"
                }}>
                    <Typography variant={"h3"}>Projects</Typography>
                </Button>

                <div className={"tech-logo-spotlight"} style={{display: "inline"}}>
                    <img className={"tech-logo-img"} src={reactLogo} alt={"React Logo"}/>
                    <img className={"tech-logo-img"} src={angularLogo} alt={"Angular Logo"}/>
                    <img className={"tech-logo-img"} src={javaLogo} alt={"Java Logo"}/>
                    <img className={"tech-logo-img"} src={wildflyLogo} alt={"Wildfly Logo"}/>
                    <img className={"tech-logo-img"} src={jsLogo} alt={"JavaScript Logo"}/>
                    <img className={"tech-logo-img"} src={pythonLogo} alt={"Python Logo"}/>
                    <img className={"tech-logo-img"} src={cppLogo} alt={"C++ Logo"}/>
                </div>

                <Paper variant={"outlined"} style={{
                    marginLeft: "auto", marginRight: "auto", marginTop: "auto",
                    borderColor: "#CCA43B", borderWidth: 0.40 + "em", width: 50 + "%"
                }}>
                    <Typography style={{textAlign: "center"}} variant={"body1"}>
                        This website was built with ReactJS frontend, Wildfly (JBoss) backend, and MySQL database.
                    </Typography>
                </Paper>
            </div>
        </div>
    </div>
);

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
