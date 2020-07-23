import React from 'react';
import PropTypes from 'prop-types';
import './Homepage.css';
import portrait from "../../images/JacketTie1.jpg"
import linkedLogo from "../../images/linkedinLogo.png"
import githubLogo from "../../images/githubLogo.png"
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const Homepage = () => (
    <div className="Homepage">
        <div className={"main-content"}>
            <Paper variant={"outlined"} style={{
                borderColor: "#CCA43B", borderWidth: 0.40 + "em", padding: 5 + "em"
            }}>
                <img className={"portrait-img"} src={portrait} alt={"Jason James"}/>
                <Typography style={{paddingTop: 1 + "em", paddingBottom: 1 + "em"}} variant={"h3"}>
                    Jason James
                </Typography>

                <Paper style={{margin: 1 + "em", display: "flex", alignItems: "center"}} elevation={10}>
                    <Typography variant={"subtitle1"}>
                        Career Status: Looking for Work
                    </Typography>
                </Paper>

                <Paper style={{margin: 1 + "em", display: "flex", alignItems: "center"}} elevation={10}>
                    <img className={"social-media-logo"} src={githubLogo} alt={"Github Profile Page"}/>
                    <a href={"https://github.com/Fulgar"}>
                        <Typography variant={"subtitle1"}>
                            Github Profile
                        </Typography>
                    </a>
                </Paper>

                <Paper style={{margin: 1 + "em", display: "flex", alignItems: "center"}} elevation={10}>
                    <img className={"social-media-logo"} src={linkedLogo} alt={"LinkedIn Profile Page"}/>
                    <a href={"https://www.linkedin.com/in/jason-james-011762146/"}>
                        <Typography variant={"subtitle1"}>
                            LinkedIn Profile
                        </Typography>
                    </a>
                </Paper>

                <Paper style={{margin: 1 + "em", display: "flex", alignItems: "center"}} elevation={10}>
                    <Typography variant={"body2"}>
                        Professional Email: jjames541907@gmail.com
                    </Typography>
                </Paper>

                <Paper style={{margin: 1 + "em", display: "flex", alignItems: "center"}} elevation={10}>
                    <Typography variant={"subtitle1"}>
                        Resume: Coming Soon
                    </Typography>
                </Paper>

            </Paper>

            <div className={"right-content"}>

            </div>

        </div>
    </div>
);

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
