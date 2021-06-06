import React, {useEffect, useState} from 'react';

import './ProjectPage.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Slideshow} from "@material-ui/icons";
import {isMobile} from "react-device-detect";
import Modal from "@material-ui/core/Modal";
import DemoMediaViewModal from "./DemoMediaViewModal/DemoMediaViewModal";


const styles = {
   projectPaper: {
        borderColor: "#CCA43B", borderWidth: 0.40 + "em", padding: 3 + "em"
    },
    mobileProjectPaper: {
        borderColor: "#CCA43B", borderWidth: 0.30 + "em", padding: 0 + "em"
    },
    halfPaperContainer: {
        margin: 2 + "em",
        display: "grid",
        gridTemplateColumns: "50% 50%"
    },
    mobileHalfPaperContainer: {
        margin: 1 + "em",
        display: "grid",
        gridTemplateColumns: "50% 50%"
    },
    leftPaper: {
        marginRight: 2 + "em"
    },
    rightPaper: {
        marginLeft: 2 + "em"
    },
    fullPaper: {
        margin: 2 + "em"
    },
    mobileLeftPaper: {
        marginRight: 1 + "em"
    },
    mobileRightPaper: {
        marginLeft: 1 + "em"
    },
    mobileFullPaper: {
        margin: 1 + "em"
    },
    allPapers: {
        padding: 1 + "em"
    },
    listItem: {
       textAlign: "center"
    },
    demoMediaPlayer: {
        maxWidth: 100 + "%",
        maxHeight: 100 + "%"
    },
    demoMediaContent: {
        maxWidth: 100 + "%",
        maxHeight: 80 + "vh"
    },
    mediaModalOpenIcon: {
        margin: "auto",
        width: 25 + "%",
        height: 25 + "%",
        cursor: "pointer"
    }
};

const ProjectPage = (props) => {



    const projectID = props.projectID;

    // HTTP Request status
    const [projectError, setProjectError] = useState(null);
    const [isProjectLoaded, setIsProjectLoaded] = useState(false);
    const [demoMediaError, setDemoMediaError] = useState(null);
    const [isDemoMediaLoaded, setIsDemoMediaLoaded] = useState(false);
    const [contributorError, setContributorError] = useState(null);
    const [isContributorLoaded, setIsContributorLoaded] = useState(false);
    const [technologyTagError, setTechnologyTagError] = useState(null);
    const [isTechnologyTagLoaded, setIsTechnologyTagLoaded] = useState(false);
    const [courseError, setCourseError] = useState(null);
    const [isCourseLoaded, setIsCourseLoaded] = useState(false);
    const [projectTypeError, setProjectTypeError] = useState(null);
    const [isProjectTypeLoaded, setIsProjectTypeLoaded] = useState(false);

    // Container for all selected Project data
    const [projectData, setProjectData] = useState({});

    // Container for all selected DemoMedia data
    const [demoMediaData, setDemoMediaData] = useState([]);

    // Container for all selected Contributor data
    const [contributorData, setContributorData] = useState([]);

    // Container for all selected TechnologyTag data
    const [technologyTagData, setTechnologyTagData] = useState([]);

    // Container for all selected Course data
    const [courseData, setCourseData] = useState({});

    // Container for all selected Project data
    const [projectTypeData, setProjectTypeData] = useState({});

    // DemoMedia View Modal fields
    const [demoMediaViewOpen, setDemoMediaViewOpen] = useState(false);
    const handleDemoMediaViewOpen = () => {
        setDemoMediaViewOpen(true);
    };
    const handleDemoMediaViewClose = () => {
        setDemoMediaViewOpen(false);
    };


    // Is executed only on first render of Projects component
    useEffect(() => {
        // Fetch selected Project database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/project/" + projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectData(result);
                    setIsProjectLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setProjectError(error);
                }
            );

        // Fetch selected DemoMedia database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/demoMedia/byProject/" + projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setDemoMediaData(result);
                    setIsDemoMediaLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setDemoMediaError(error);
                }
            );

        // Fetch selected Contributor database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/contributor/byProject/" + projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setContributorData(result);
                    setIsContributorLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setContributorError(error);
                }
            );

        // Fetch selected TechnologyTag database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/technologyTag/byProject/" + projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setTechnologyTagData(result);
                    setIsTechnologyTagLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setTechnologyTagError(error);
                }
            );

        // Fetch selected ProjectType database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/projectType/byProject/" + projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectTypeData(result);
                    setIsProjectTypeLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setProjectTypeError(error);
                }
            );
    }, []); // Explicitly defines that it will not re-execute after first render, because it does not depend on any change

    // Will only execute again after first render if "isProjectLoaded" is changed
    useEffect(() => {
        // Only fetch Course data if project data has loaded and have determined if CourseID exists for project
        if (isProjectLoaded) {
            if (projectData["courseID"] !== undefined) {
                // Fetch selected Course database data via GET request
                fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/course/byProject/" + projectID)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setCourseData(result);
                            setIsCourseLoaded(true);
                        },
                        (error) => {
                            console.error(error);
                            setCourseError(error);
                        }
                    );
            }
        }
    }
    , [isProjectLoaded]); // Depends on isProjectLoaded changing in order to re-execute

    return (
        <div className={!isMobile ? "ProjectPage" : "mobile-mid-content"}>
            <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
                {
                    // If projectData is loaded display project title
                    // If not then display whether it is still loading or that there is an error
                    (isProjectLoaded === true)
                        ? (<span>{projectData["title"]}</span>)
                        : ((projectError) ? (<span>PROJECT NOT FOUND</span>) : (<span>PROJECT DATA LOADING</span>))
                }
            </Typography>

            <Paper className={"project-paper"} style={!isMobile ? styles.projectPaper : styles.mobileProjectPaper}
                   variant={"outlined"}>

                <Paper style={!isMobile ? {...styles.allPapers, ...styles.fullPaper} : {...styles.allPapers, ...styles.mobileFullPaper}} className={"description-paper"} elevation={10}>
                    <Typography variant={"h6"}>Description:</Typography>
                    <Typography variant={"body1"}>
                        {
                            // If projectData is loaded display project description
                            // If not display nothing
                            (isProjectLoaded === true)
                                ? (<span>{projectData["description"]}</span>)
                                : (<span> </span>)
                        }
                    </Typography>
                </Paper>

                <div style={!isMobile ? styles.halfPaperContainer : styles.mobileHalfPaperContainer} className={"top-half-paper-container"}>
                    <Paper style={!isMobile ? {...styles.allPapers, ...styles.leftPaper} : {...styles.allPapers, ...styles.mobileLeftPaper}} className={"github-project-paper"} elevation={10}>
                        <Typography variant={"h6"}>Github Project:</Typography>
                        <Typography variant={"body1"}>
                            {
                                // If projectData is loaded display project description
                                // If not display nothing
                                (isProjectLoaded === true)
                                    ? (<span><a href={projectData["githubLink"]}>Link</a></span>)
                                    : (<span> </span>)
                            }
                        </Typography>
                    </Paper>

                    <Paper style={!isMobile ? {...styles.allPapers, ...styles.rightPaper} : {...styles.allPapers, ...styles.mobileRightPaper}} className={"project-type-paper"} elevation={10}>
                        <Typography variant={"h6"}>Project Type:</Typography>
                        <Typography variant={"body1"}>
                            {
                                // If projectData is loaded display project description
                                // If not display nothing
                                (isProjectTypeLoaded === true)
                                    ? (<span>{projectTypeData["name"]}</span>)
                                    : (<span> </span>)
                            }
                        </Typography>
                    </Paper>
                </div>

                <Paper style={!isMobile ? {...styles.allPapers, ...styles.fullPaper} : {...styles.allPapers, ...styles.mobileFullPaper}} className={"demo-media"} elevation={10}>
                    <Typography variant={"h6"}>Demo Media:</Typography>
                    {
                        // If demoMedia data is loaded then display content
                        // If not, then display if there is an error or if it is currently still loading
                        (isDemoMediaLoaded === true)
                            ? (<div style={styles.demoMediaPlayer} className={"demo-media-player"}>
                                    <Slideshow style={styles.mediaModalOpenIcon} onClick={handleDemoMediaViewOpen}/>

                                    <Modal
                                        className={"demo-media-view-modal"}
                                        open={demoMediaViewOpen}
                                        onClose={handleDemoMediaViewClose}>
                                        <DemoMediaViewModal demoMediaData={demoMediaData} handleDemoMediaViewClose={handleDemoMediaViewClose}/>
                                    </Modal>
                                </div>
                            )
                            : ((demoMediaError) ? (<span>DEMO MEDIA NOT FOUND</span>) : (<span>There is no Demo Media associated with this project</span>))
                    }
                </Paper>

                <div style={!isMobile ? styles.halfPaperContainer : styles.mobileHalfPaperContainer} className={"bottom-half-paper-container"}>
                    <Paper style={!isMobile ? {...styles.allPapers, ...styles.leftPaper} : {...styles.allPapers, ...styles.mobileLeftPaper}} className={"contributors-paper"} elevation={10}>
                        <Typography variant={"h6"}>Contributors:</Typography>
                        {
                            // If contributorData is loaded display contributor info
                            // If not, display status
                            (isContributorLoaded === true)
                                ? (<List>
                                    {
                                        contributorData.map((contributorRow, i) => {
                                            return (
                                              <ListItem style={styles.listItem} button component={"a"} href={contributorRow["githubProfileLink"]}>
                                                  <ListItemText>
                                                      <span>{contributorRow["firstName"]} {contributorRow["lastName"]}</span>
                                                  </ListItemText>
                                              </ListItem>
                                            );
                                        })
                                    }
                                    </List>)
                                : (<span> </span>)
                        }
                    </Paper>

                    <Paper style={!isMobile ? {...styles.allPapers, ...styles.rightPaper} : {...styles.allPapers, ...styles.mobileRightPaper}} className={"tech-tags-paper"} elevation={10}>
                        <Typography variant={"h6"}>Technology Tags:</Typography>
                        {
                            // If technologyTagData is loaded display technologyTag info
                            // If not, display status
                            (isTechnologyTagLoaded === true)
                                ? (<List>
                                    {
                                        technologyTagData.map((technologyTagRow, i) => {
                                            return (
                                                <ListItem style={styles.listItem}>
                                                    <ListItemText>
                                                        {technologyTagRow["technologyName"]}
                                                    </ListItemText>
                                                </ListItem>
                                            );
                                        })
                                    }
                                </List>)
                                : (<span> </span>)
                        }
                    </Paper>
                </div>

                <Paper style={{margin: 2 + "em"}} className={"course-info-paper"} elevation={10}>
                    {
                        (isCourseLoaded === true)
                            ? (
                                <React.Fragment>
                                    <Typography variant={"h6"}>University Course Info:</Typography>
                                    {
                                        <Typography variant={"subtitle1"}>Subject Name: {courseData["subjectName"]}</Typography>
                                    }
                                    {
                                        <Typography variant={"subtitle1"}>Course Name: {courseData["courseName"]}</Typography>
                                    }
                                </React.Fragment>


                            )
                            : (<React.Fragment/>)
                    }
                </Paper>
            </Paper>
        </div>
    );
};
export default ProjectPage;
