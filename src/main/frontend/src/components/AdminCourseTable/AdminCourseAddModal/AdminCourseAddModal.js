import React, {useState} from 'react';
import './AdminCourseAddModal.css';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
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
    }
};

const AdminCourseAddModal = (props) => {
    // Form data
    const [newCourseName, setNewCourseName] = useState("");
    const [newSubjectName, setNewSubjectName] = useState("");

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    function handleChange() {
        props.onChange();
    }

    const handleSubmit = async () => {
        const data = {
            "courseName": newCourseName,
            "subjectName": newSubjectName
        };

        const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/course/create",
            {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data)
            }).then(setSubmitted(true));
    };

    if (submitted) {
        handleChange();
    }
    return (
        <Paper style={styles.modalStyle} elevation={10} className="AdminCourseAddModal">
            <div className={"CourseAddModalInner"}>
                <Typography color={"primary"} variant={"h4"}>
                    Create Course
                </Typography>
                <br/><br/><br/><br/>
                <form autoComplete={"off"}>
                    <TextField
                        required
                        id={"courseNameInput"}
                        label={"Course Name"}
                        defaultValue={""}
                        variant={"outlined"}
                        onChange={(e) => {setNewCourseName(e.target.value)}}
                    />
                    <br/><br/>
                    <TextField
                        required
                        id={"subjectNameInput"}
                        label={"Subject Name"}
                        defaultValue={""}
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
};


export default AdminCourseAddModal;
