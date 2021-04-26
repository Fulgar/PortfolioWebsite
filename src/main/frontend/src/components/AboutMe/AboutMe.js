import React from 'react';
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
                  Hello, my name is Jason James, and welcome to my website! I am a recent college graduate and a software engineer, currently
                  working for Marriott Vacations Worldwide. I live in western Cobb County (NW Suburbs of Atlanta), GA, and have lived there most
                  of my life. My hobbies consist of programming, video games, and running. I began my journey of becoming a software engineer when
                  I was a freshmen in high school, when I discovered the possibility of programming mods and plugins for various videos games. At
                  the time I spent a lot of time developing server plugins (Java) for the video game, "Minecraft", for the main purpose of my friends
                  and I enjoying it for our own personal fun outside of school. I've discovered over time that the reason why I love software
                  engineering and programming, isn't the act of reading and writing code, but BUILDING things and understanding how other things works.
                  It's a field that actively promotes the idea of "Oh you don't know how to use this tool? Just go look up the documentation for it
                  and learn as you go!". Currently, my main professional interests are in Full Stack web development.
              </Typography>

              <Divider variant={"middle"}/>

              <Typography variant={"h6"}>
                  Education
              </Typography>
              <Typography style={{textAlign: "left"}} variant={"body1"}>
                  I graduated in the Summer of 2020 from Kennesaw State University with a Bachelor of
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
                  DBMS, and React frontend. I also have experience with setting up, deploying, and managing a
                  Linux server. For more detailed information on my past projects, please take a look at the
                  “Projects” page/tab.
              </Typography>

              <Divider variant={"middle"}/>

              <Typography variant={"h6"}>
                  Relevant Links & Contact Info
              </Typography>

              <a href={"https://www.linkedin.com/in/jason-james-011762146/"}>
                  <Typography variant={"body1"}>LinkedIn Profile</Typography>
              </a>

              <a href={"https://github.com/Fulgar"}>
                  <Typography variant={"body1"}>GitHub Profile</Typography>
              </a>

              <Typography variant={"body1"}>Professional Email: jjames541907@gmail.com</Typography>

              <Typography variant={"body1"}>For Phone Contact Please Send Email First</Typography>

          </Paper>
      </div>
  </div>
);

AboutMe.propTypes = {};

AboutMe.defaultProps = {};

export default AboutMe;
