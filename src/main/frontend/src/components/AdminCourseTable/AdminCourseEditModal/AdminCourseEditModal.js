import React, {useEffect, useState} from 'react';
import './AdminCourseEditModal.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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

const AdminCourseEditModal = (props) => {
    // Container for target Course database row
    const [courseData, setCourseData] = useState({});

    // HTTP Request status
    const [courseError, setCourseError] = useState(null);
    const [isCourseLoaded, setIsCourseLoaded] = useState(false);

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    // Form data
    const [newCourseName, setNewCourseName] = useState("");
    const [newSubjectName, setNewSubjectName] = useState("");

    // Function to send message to parent component that submission has taken place and should close modal and refresh table
    function handleChange() {
        props.onChange();
    }

    // Handler method for submit button
    const handleSubmit = async () => {
        await editCourse();
    };

    const editCourse = async () => {
        const data = {
            "courseID": props.courseID,
            "courseName": newCourseName,
            "subjectName": newSubjectName
        };

        return await fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/course/update",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(setSubmitted(true));
    };

    useEffect(() => {
        // Fetch targeted Course database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/course/" + props.courseID)
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
    }, []);

    useEffect(() => {
        if (courseData !== {}) {
            setNewCourseName(courseData["courseName"]);
            setNewSubjectName(courseData["subjectName"]);
        }
    }, [courseData]);

    // If course has been edited
    if (submitted) {
        handleChange();
    }
    // If HTTP or internal server error occurs
    if (courseError) {
        return <div>Error: {courseError.message}</div>;
    }
    // If any of the database data sets are not finished loading then keep displaying "Loading" indicator
    else if (!isCourseLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <Paper style={styles.modalStyle} elevation={10} className="AdminCourseEditModal">
                <div style={styles.modalInner} className={"CourseEditModalInner"}>
                    <Typography color={"primary"} variant={"h4"}>
                        Edit Course
                    </Typography>
                    <br/><br/><br/><br/>
                    <form autoComplete={"off"}>
                        <TextField
                            required
                            id={"courseNameInput"}
                            label={"Course Name"}
                            defaultValue={newCourseName}
                            variant={"outlined"}
                            onChange={(e) => {setNewCourseName(e.target.value)}}
                        />
                        <br/><br/>
                        <TextField
                            required
                            id={"subjectNameInput"}
                            label={"Subject Name"}
                            defaultValue={newSubjectName}
                            variant={"outlined"}
                            onChange={(e) => {setNewSubjectName(e.target.value)}}
                        />
                        <br/><br/>
                        <Button color={"primary"} variant={"contained"} onClick={() => {handleSubmit()}}>
                            Submit
                        </Button>
                    </form>
                </div>
            </Paper>
        );
    }
};

export default AdminCourseEditModal;
