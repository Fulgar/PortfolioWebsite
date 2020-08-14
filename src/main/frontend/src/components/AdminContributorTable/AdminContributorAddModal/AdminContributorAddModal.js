import React, {useState} from 'react';
import './AdminContributorAddModal.css';
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
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

const AdminContributorAddModal = (props) => {
    // Form data
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newGithubProfile, setNewGithubProfile] = useState("");

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    function handleChange() {
        props.onChange();
    }

    const handleSubmit = async () => {
        const data = {
            "firstName": newFirstName,
            "lastName": newLastName,
            "githubProfileLink": newGithubProfile
        };

        const response = await fetch("/portfolio/contributor/create",
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
        <Paper style={styles.modalStyle} elevation={10} className="AdminContributorAddModal">
            <div className={"ContributorAddModalInner"}>
                <Typography color={"primary"} variant={"h4"}>
                    Create Contributor
                </Typography>
                <br/><br/><br/><br/>
                <form autoComplete={"off"}>
                    <TextField
                        required
                        id={"firstNameInput"}
                        label={"First Name"}
                        defaultValue={""}
                        variant={"outlined"}
                        onChange={(e) => {setNewFirstName(e.target.value)}}
                    />
                    <br/><br/>
                    <TextField
                        required
                        id={"lastNameInput"}
                        label={"Last Name"}
                        defaultValue={""}
                        variant={"outlined"}
                        onChange={(e) => {setNewLastName(e.target.value)}}
                    />
                    <br/><br/>
                    <TextField
                        required
                        id={"githubProfileInput"}
                        label={"Github Profile Link"}
                        defaultValue={""}
                        variant={"outlined"}
                        helperText={"MUST INCLUDE https://"}
                        onChange={(e) => {setNewGithubProfile(e.target.value)}}
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


export default AdminContributorAddModal;
