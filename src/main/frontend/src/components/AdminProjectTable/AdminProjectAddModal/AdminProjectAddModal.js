import React, {useState} from 'react';
import './AdminProjectAddModal.css';
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

const AdminProjectAddModal = (props) => {
    // Form data
    const [newProjectTitle, setNewProjectTitle] = useState("");
    const [newProjectTypeName, setNewProjectTypeName] = useState("");
    const [newCourseName, setNewCourseName] = useState("");
    const [newContributors, setNewContributors] = useState([]);
    const [newTechTags, setNewTechTags] = useState([]);
    const [newDemoMedia, setNewDemoMedia] = useState([]);

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    function handleChange() {
        props.onChange();
    }

    const handleSubmit = async () => {
        const data = {
            "projectTitle": newProjectTitle,
            "projectTypeName": newProjectTypeName,
            "courseName": newCourseName,
            "contributors": newContributors,
            "techTags": newTechTags,
            "demoMedia": newDemoMedia
        };

        const response = await fetch("/portfolio/project/create",
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
        <Paper style={styles.modalStyle} elevation={10} className="AdminProjectAddModal">
            <div className={"ProjectAddModalInner"}>
                <Typography color={"primary"} variant={"h4"}>
                    Create Project
                </Typography>
                <br/><br/><br/><br/>
                <form autoComplete={"off"}>
                    <TextField
                        required
                        id={"projectNameInput"}
                        label={"Project Name"}
                        defaultValue={""}
                        variant={"outlined"}
                        onChange={(e) => {setNewProjectTitle(e.target.value)}}
                    />
                    <br/><br/>
                    <TextField
                        required
                        id={"courseNameInput"}
                        label={"Course Name"}
                        defaultValue={""}
                        variant={"outlined"}
                        onChange={(e) => {setNewCourseName(e.target.value)}}
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


export default AdminProjectAddModal;
