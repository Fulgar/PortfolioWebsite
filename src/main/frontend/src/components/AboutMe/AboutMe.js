import React from 'react';
import PropTypes from 'prop-types';
import './AboutMe.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const AboutMe = () => (
  <div className="AboutMe">
      <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
          ABOUT ME
      </Typography>
      <div className={ "mid-content" }>
          <Paper className={ "about-paper"} style={{
              borderColor: "#CCA43B", borderWidth: 0.40 + "em", padding: 5 + "em"}}
                 variant={"outlined"}>

              <Typography variant={"h6"}>
                  A Brief History & Introduction
              </Typography>
              <Typography style={{textAlign: "left"}} variant={"body1"}>
                  Hello, my name is Jason James, and welcome to my website! I am a 24-year-old college student and soon-to-be
                  college graduate, who is seeking employment in Software Engineering. I have lived in Cobb County, GA throughout my
                  entire life. My hobbies consist of programming, video games, and running (mostly when the weather is nice!). I started
                  programming some time back in early high school by developing mods and server plugins (Java) for the video game,
                  “Minecraft”, for my friends and I to enjoy. Programming has always excited me ever since as it allows for so many
                  challenging problems and puzzles to solve. I am currently seeking a career in Web Development as either a Full Stack,
                  Frontend, or Backend Engineer.
              </Typography>

              <Divider variant={"middle"}/>

              <Typography variant={"h6"}>
                  Education
              </Typography>
              <Typography style={{textAlign: "left"}} variant={"body1"}>
                  I will be graduating in the Summer of 2020 from Kennesaw State University with a Bachelor of
                  Science Degree in Computer Science. I am also largely self-taught.
              </Typography>

              <Divider variant={"middle"}/>

              <Typography variant={"h6"}>
                  Skills & Past Projects
              </Typography>
              <Typography style={{textAlign: "left"}} variant={"body1"}>
                  I have experience with programming languages such as Java, Python, JavaScript (and
                  Typescript), SQL, and C++. I have some experience using frontend JavaScript frameworks, such
                  as Angular and React. I have also become familiar with Java EE for backend development. I
                  have successfully worked in a group/team environment for my Senior Project (capstone) at
                  Kennesaw State University, in which we developed a modified variant of chess with AI support,
                  in which we used Git with GitHub. I developed this website with a Java EE backend, MySQL
                  DBMS, and React frontend. For more detailed information on my past projects, please take a
                  look at the “Projects” page/tab.
              </Typography>


              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

              <b>Hello</b>
          </Paper>
      </div>
  </div>
);

AboutMe.propTypes = {};

AboutMe.defaultProps = {};

export default AboutMe;
