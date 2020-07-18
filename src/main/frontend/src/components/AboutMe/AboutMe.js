import React from 'react';
import PropTypes from 'prop-types';
import './AboutMe.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const AboutMe = () => (
  <div className="AboutMe">
      <Typography color={"secondary"} variant={"h3"}>
          ABOUT ME
      </Typography>
      <div className={ "mid-content" }>
          <Paper className={ "about-paper"} style={{
              borderColor: "#CCA43B", borderWidth: 0.40 + "em", paddingBlock: 20 + "px"}}
                 variant={"outlined"}>
              <Typography variant={"body1"}>
                  Hello World
              </Typography>
              <Divider variant={"middle"}/>
              <Typography variant={"body1"}>
                  Blah
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
