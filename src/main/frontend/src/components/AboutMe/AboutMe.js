import React from 'react';
import PropTypes from 'prop-types';
import './AboutMe.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const AboutMe = () => (
  <div className="AboutMe">
      <Typography color={"secondary"} variant={"h3"}>
          ABOUT ME
      </Typography>
      <div className={ "mid-content" }>
          <Paper className={ "about-paper"} style={{ borderColor: "#CCA43B", borderWidth: 0.25 + "em"}}  variant={"outlined"}>
              <Typography variant={"body1"}>
                  Hello World
              </Typography>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <br/><br/><br/><br/><br/>
              <Typography variant={"body1"}>
                  Testing
              </Typography>
          </Paper>
      </div>
  </div>
);

AboutMe.propTypes = {};

AboutMe.defaultProps = {};

export default AboutMe;
