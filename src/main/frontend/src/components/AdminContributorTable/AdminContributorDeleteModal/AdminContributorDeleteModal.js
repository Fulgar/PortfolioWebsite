import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './AdminContributorDeleteModal.css';
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

const AdminContributorDeleteModal = (props) => {
    // Container for all targeted Project_Contributor database rows
    const [projectContributorData, setProjectContributorData] = useState([]);
    // Container for target Contributor database row
    const [contributorData, setContributorData] = useState({});

    // HTTP Request status
    const [contributorError, setContributorError] = useState(null);
    const [isProjectContributorLoaded, setIsProjectContributorLoaded] = useState(false);
    const [projectContributorError, setProjectContributorError] = useState(null);
    const [isContributorLoaded, setIsContributorLoaded] = useState(false);

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    // Function to send message to parent component that submission has taken place and should close modal and refresh table
    function handleChange() {
        props.onChange();
    }

    // Handler method for submit button
    const handleSubmit = async () => {
        if (projectContributorData.length !== 0) {
            projectContributorData.map(async (projectAssociation, i) => {
                await deleteProjectContributor(projectAssociation.projectID);
            });
            await deleteContributor();
        }
        else {
            await deleteContributor();
        }

    };

    const deleteContributor = async () => {
        return await fetch("/portfolio/contributor/" + props.contributorID,
            {
                method: "DELETE"
            }).then(setSubmitted(true));
    };

    const deleteProjectContributor = async (projectID) => {
        return await fetch("/portfolio/project_contributor/" + projectID + "/" + props.contributorID,
            {
                method: "DELETE"
            });
    };

    useEffect(() => {
        // Fetch targeted Contributor database data via GET request
        fetch("/portfolio/contributor/" + props.contributorID)
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

        // Fetch targeted Project_Contributor association database data via GET request
        fetch("/portfolio/project_contributor/contributorID/" + props.contributorID)
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectContributorData(result);
                    setIsProjectContributorLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setProjectContributorError(error);
                }
            );
    }, []);

    // If contributor has been deleted
    if (submitted) {
        handleChange();
    }
    // If HTTP or internal server error occurs
    if (projectContributorError) {
        return <div>Error: {projectContributorError.message}</div>;
    }
    if (contributorError) {
        return <div>Error: {contributorError.message}</div>;
    }
    // If any of the database data sets are not finished loading then keep displaying "Loading" indicator
    else if (!isContributorLoaded || !isProjectContributorLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <Paper style={styles.modalStyle} elevation={10} className="AdminContributorDeleteModal">
                <div style={styles.modalInner} className={"ContributorDeleteModalInner"}>
                    <Typography color={"primary"} variant={"h4"}>
                        Delete Contributor
                    </Typography>
                    <br/><br/><br/>
                    <Typography color={"primary"} variant={"h5"}>
                        Contributor Info:
                    </Typography>
                    <br/><br/>
                    <Typography color={"primary"} variant={"body1"}>
                        ContributorID: {contributorData.contributorID}
                    </Typography>
                    <br/>
                    <Typography color={"primary"} variant={"body1"}>
                        First Name: {contributorData.firstName}
                    </Typography>
                    <br/>
                    <Typography color={"primary"} variant={"body1"}>
                        Last Name: {contributorData.lastName}
                    </Typography>
                    <br/>
                    <Typography color={"primary"} variant={"body1"}>
                        Github Profile: {contributorData.githubProfileLink}
                    </Typography>
                    <br/><br/>
                    <Typography color={"primary"} variant={"h5"}>
                        Projects Associated Info (ProjectID's):
                    </Typography>

                    {
                        projectContributorData.map((projectAssociation, i) => {
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

                    <Button color={"secondary"} variant={"contained"} onClick={() => {handleSubmit()}}>
                        Confirm Delete
                    </Button>
                </div>
            </Paper>
        );
    }
};

export default AdminContributorDeleteModal;
