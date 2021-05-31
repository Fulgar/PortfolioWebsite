import React, {useEffect, useState} from 'react';
import './AdminContributorEditModal.css';
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

const AdminContributorEditModal = (props) => {
    // Container for target Contributor database row
    const [contributorData, setContributorData] = useState({});

    // HTTP Request status
    const [contributorError, setContributorError] = useState(null);
    const [isContributorLoaded, setIsContributorLoaded] = useState(false);

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    // Form data
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newGithubProfile, setNewGithubProfile] = useState("");

    // Function to send message to parent component that submission has taken place and should close modal and refresh table
    function handleChange() {
        props.onChange();
    }

    // Handler method for submit button
    const handleSubmit = async () => {
        await editContributor();
    };

    const editContributor = async () => {
        const data = {
            "contributorID": props.contributorID,
            "firstName": newFirstName,
            "lastName": newLastName,
            "githubProfileLink": newGithubProfile
        };

        return await fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/contributor/update",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(setSubmitted(true));
    };

    useEffect(() => {
        // Fetch targeted Contributor database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/contributor/" + props.contributorID)
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
    }, []);

    useEffect(() => {
        if (contributorData !== {}) {
            setNewFirstName(contributorData["firstName"]);
            setNewLastName(contributorData["lastName"]);
            setNewGithubProfile(contributorData["githubProfileLink"]);
        }
    }, [contributorData]);

    // If contributor has been edited
    if (submitted) {
        handleChange();
    }
    // If HTTP or internal server error occurs
    if (contributorError) {
        return <div>Error: {contributorError.message}</div>;
    }
    // If any of the database data sets are not finished loading then keep displaying "Loading" indicator
    else if (!isContributorLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <Paper style={styles.modalStyle} elevation={10} className="AdminContributorEditModal">
                <div style={styles.modalInner} className={"ContributorEditModalInner"}>
                    <Typography color={"primary"} variant={"h4"}>
                        Edit Contributor
                    </Typography>
                    <br/><br/><br/><br/>
                    <form autoComplete={"off"}>
                        <TextField
                            required
                            id={"firstNameInput"}
                            label={"First Name"}
                            defaultValue={newFirstName}
                            variant={"outlined"}
                            onChange={(e) => {setNewFirstName(e.target.value)}}
                        />
                        <br/><br/>
                        <TextField
                            required
                            id={"lastNameInput"}
                            label={"Last Name"}
                            defaultValue={newLastName}
                            variant={"outlined"}
                            onChange={(e) => {setNewLastName(e.target.value)}}
                        />
                        <br/><br/>
                        <TextField
                            required
                            id={"githubProfileInput"}
                            label={"Github Profile Link"}
                            defaultValue={newGithubProfile}
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
    }
};

export default AdminContributorEditModal;
