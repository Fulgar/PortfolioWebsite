import React, {useEffect, useState} from 'react';
import './AdminCourseDeleteModal.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
    modalStyle: {
        width: 750,
        height: 750,
        position: "absolute",
        left: 50 + "%",
        top: 50 + "%",
        transform: "translate(-50%, -50%)",
        display: "flex", justifyContent: "center", alignItems: "center"
    },
    modalInner: {
        textAlign: "center", alignItems: "center"
    }
};

const AdminCourseDeleteModal = (props) => {
    // Container for all targeted Project_Course database rows
    const [projectData, setProjectData] = useState([]);
    // Container for target Course database row
    const [courseData, setCourseData] = useState({});

    // HTTP Request status
    const [courseError, setCourseError] = useState(null);
    const [isProjectLoaded, setIsProjectLoaded] = useState(false);
    const [projectError, setProjectError] = useState(null);
    const [isCourseLoaded, setIsCourseLoaded] = useState(false);

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    // Function to send message to parent component that submission has taken place and should close modal and refresh table
    function handleChange() {
        props.onChange();
    }

    // Handler method for submit button
    const handleSubmit = async () => {
        await deleteCourse();
    };

    const deleteCourse = async () => {
        return await fetch("/portfolio/course/" + props.courseID,
            {
                method: "DELETE"
            }).then(setSubmitted(true));
    };

    useEffect(() => {
        // Fetch targeted Course database data via GET request
        fetch("/portfolio/course/" + props.courseID)
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

        // Fetch all Project association database data via GET request
        fetch("/portfolio/project/getAll")
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
    }, []);

    // If course has been deleted
    if (submitted) {
        handleChange();
    }
    // If HTTP or internal server error occurs
    if (projectError) {
        return <div>Error: {projectError.message}</div>;
    }
    if (courseError) {
        return <div>Error: {courseError.message}</div>;
    }
    // If any of the database data sets are not finished loading then keep displaying "Loading" indicator
    else if (!isCourseLoaded || !isProjectLoaded) {
        return <div>Loading...</div>;
    }
    else {
        // Create a list of projects that have courseID association with targeted Course
        let projectsAssociatedWithCourse = [];
        projectData.map((project, i) => {
            if (project.courseID === props.courseID) {
                projectsAssociatedWithCourse.push(project);
            }
        });

        return (
            <Paper style={styles.modalStyle} elevation={10} className="AdminCourseDeleteModal">
                <div style={styles.modalInner} className={"CourseDeleteModalInner"}>
                    <Typography color={"primary"} variant={"h4"}>
                        Delete Course
                    </Typography>
                    <br/><br/><br/>
                    <Typography color={"primary"} variant={"h5"}>
                        Course Info:
                    </Typography>
                    <br/><br/>
                    <Typography color={"primary"} variant={"body1"}>
                        CourseID: {courseData.courseID}
                    </Typography>
                    <br/>
                    <Typography color={"primary"} variant={"body1"}>
                        Course Name: {courseData.courseName}
                    </Typography>
                    <br/>
                    <Typography color={"primary"} variant={"body1"}>
                        Subject Name: {courseData.subjectName}
                    </Typography>
                    <br/><br/>
                    <Typography color={"primary"} variant={"h5"}>
                        Projects Associated Info (ProjectID's):
                    </Typography>

                    {
                        projectsAssociatedWithCourse.map((projectAssociation, i) => {
                            return (
                                <React.Fragment>
                                    <br/>
                                    <Typography color={"primary"} variant={"body1"}>
                                        {projectAssociation.projectID}
                                    </Typography>
                                </React.Fragment>
                            );
                        })
                    }

                    {
                        projectsAssociatedWithCourse.length === 0
                            ? (
                                <Button color={"secondary"} variant={"contained"} onClick={() => {handleSubmit()}}>
                                    Confirm Delete
                                </Button>
                            )
                            : (
                                <Typography color={"error"} variant={"h3"}>
                                    Cannot delete selected Course! Project(s) associated with it. See above for projectID's.
                                </Typography>
                            )
                    }

                </div>
            </Paper>
        );
    }
};

export default AdminCourseDeleteModal;
