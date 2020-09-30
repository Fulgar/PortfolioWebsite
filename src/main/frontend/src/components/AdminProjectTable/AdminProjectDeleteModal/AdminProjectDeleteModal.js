import React, {useEffect, useState} from 'react';
import './AdminProjectDeleteModal.css';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const styles = {
    modalStyle: {
        width: 800,
        height: 800,
        position: "absolute",
        left: 50 + "%",
        top: 50 + "%",
        transform: "translate(-50%, -50%)",
        display: "flex", justifyContent: "center", textAlign: "center",
        overflowY: "auto",
        padding: 7 + "em"
    },
    form: {
        display: "block", alignItems: "center"
    },
    formContent: {
        margin: "2em auto", minWidth: 10 + "em", display: "flex",
    },
    divider: {
        margin: "4em auto", minWidth: 10 + "em", display: "flex",
    },
    addButtonInner: {
        display: "flex", justifyContent: "center", alignItems: "center"
    },
    button: {
        marginRight: "auto", marginLeft: "auto", display: "block", marginBottom: 0.5 + "em"
    },
    paper: {
        padding: 1 + "em", minWidth: 700
    },
    paperInner: {
        display: "block"
    }
};

const AdminProjectDeleteModal = (props) => {
    // Data fields
    const [projectData, setProjectData] = useState({});
    const [contributorData, setContributorData] = useState([]);
    const [technologyTagData, setTechnologyTagData] = useState([]);
    const [courseData, setCourseData] = useState({});
    const [demoMediaData, setDemoMediaData] = useState([]);
    const [projectTypeData, setProjectTypeData] = useState([]);

    // HTTP Request Status
    const [isProjectDataLoaded, setIsProjectDataLoaded] = useState(false);
    const [isContributorDataLoaded, setIsContributorDataLoaded] = useState(false);
    const [isTechnologyTagDataLoaded, setIsTechnologyTagDataLoaded] = useState(false);
    const [isCourseDataLoaded, setIsCourseDataLoaded] = useState(false);
    const [isDemoMediaDataLoaded, setIsDemoMediaDataLoaded] = useState(false);
    const [isProjectTypeDataLoaded, setIsProjectTypeDataLoaded] = useState(false);


    // Is called on the first render of component
    useEffect(() => {
        // Fetch targeted Project database data via GET request
        fetch("/portfolio/project/" + props.projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectData(result);
                    setIsProjectDataLoaded(true);
                },
                (error) => {
                    console.error(error);
                }
            );

        // Fetch targeted Contributor database data via GET request
        fetch("/portfolio/contributor/byProject/" + props.projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setContributorData(result);
                    setIsContributorDataLoaded(true);
                },
                (error) => {
                    console.error(error);
                }
            );

        // Fetch targeted TechnologyTag database data via GET request
        fetch("/portfolio/technologyTag/byProject/" + props.projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setTechnologyTagData(result);
                    setIsTechnologyTagDataLoaded(true);
                },
                (error) => {
                    console.error(error);
                }
            );

        // Fetch targeted Course database data via GET request
        fetch("/portfolio/course/byProject/" + props.projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setCourseData(result);
                    setIsCourseDataLoaded(true);
                },
                (error) => {
                    console.error(error);
                }
            );

        // Fetch targeted DemoMedia database data via GET request
        fetch("/portfolio/demoMedia/byProject/" + props.projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setDemoMediaData(result);
                    setIsDemoMediaDataLoaded(true);
                },
                (error) => {
                    console.error(error);
                }
            );

        // Fetch targeted ProjectType database data via GET request
        fetch("/portfolio/projectType/byProject/" + props.projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectTypeData(result);
                    setIsProjectTypeDataLoaded(true);
                },
                (error) => {
                    console.error(error);
                }
            );
    }, []);

    const handleSubmit = async () => {

    };

    if (!isProjectDataLoaded || !isContributorDataLoaded || !isTechnologyTagDataLoaded
        || !isCourseDataLoaded || !isDemoMediaDataLoaded || !isProjectTypeDataLoaded) {
        return (
            <div>
                Loading ...
            </div>
        );
    }
    else {
        return (
            <Paper style={styles.modalStyle} elevation={10} className="AdminProjectDeleteModal">
                <div className={"ProjectDeleteModalInner"}>
                    <Typography color={"primary"} variant={"h4"}>
                        Delete Project
                    </Typography>
                    <br/><br/><br/><br/>
                    <Typography color={"primary"} variant={"h5"}>
                        Project Info:
                    </Typography>
                    <br/><br/>
                    <Typography color={"primary"} variant={"body1"}>
                        ProjectID: {props.projectID}
                    </Typography>
                    <br/>
                    <Typography color={"primary"} variant={"body1"}>
                        Title: {projectData.title}
                    </Typography>
                    <br/>
                    <Typography color={"primary"} variant={"body1"}>
                        Description: {projectData.description}
                    </Typography>
                    <br/>
                    <Typography color={"primary"} variant={"body1"}>
                        Github Link: {projectData.githubLink}
                    </Typography>
                    <br/>
                    <Typography color={"primary"} variant={"body1"}>
                        Project Type: {projectTypeData.name}
                    </Typography>
                    <br/>
                    <Typography color={"primary"} variant={"body1"}>
                        {projectData.courseID === null
                            ? (
                                <span>Course: Null</span>
                            )
                            : (
                                <span>Course: {courseData.courseName}</span>
                            )
                        }
                    </Typography>
                    <br/><br/>
                    <Typography color={"primary"} variant={"h5"}>
                        Associated DemoMedia Info:
                    </Typography>

                    {
                        demoMediaData.map((demoMediaAssociation) => {
                            return (
                                <React.Fragment>
                                    <br/>
                                    <Typography color={"primary"} variant={"body1"}>
                                        ID: {demoMediaAssociation.demoMediaID} -- Name: {demoMediaAssociation.mediaTitle}
                                    </Typography>
                                </React.Fragment>
                            );
                        })
                    }

                    <br/><br/>
                    <Typography color={"primary"} variant={"h5"}>
                        Associated TechnologyTags Info:
                    </Typography>

                    {
                        technologyTagData.map((technologyTagAssociation) => {
                            return (
                                <React.Fragment>
                                    <br/>
                                    <Typography color={"primary"} variant={"body1"}>
                                        ID: {technologyTagAssociation.technologyID} -- Name: {technologyTagAssociation.technologyName}
                                    </Typography>
                                </React.Fragment>
                            );
                        })
                    }

                    <br/><br/>
                    <Typography color={"primary"} variant={"h5"}>
                        Associated Contributors Info:
                    </Typography>

                    {
                        contributorData.map((contributorAssociation) => {
                            return (
                                <React.Fragment>
                                    <br/>
                                    <Typography color={"primary"} variant={"body1"}>
                                        ID: {contributorAssociation.contributorID} -- Name: {contributorAssociation.firstName
                                    + " " + contributorAssociation.lastName}
                                    </Typography>
                                </React.Fragment>
                            );
                        })
                    }

                    <br/>

                    <Button style={{margin: "1em auto"}} color={"secondary"} variant={"contained"}
                            onClick={async () => {await handleSubmit()}}>
                        Confirm Delete
                    </Button>
                </div>

            </Paper>
        );
    }

};


export default AdminProjectDeleteModal;
