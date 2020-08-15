import React, {useEffect, useState} from 'react';
import './AdminTechnologyTagDeleteModal.css';
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

const AdminTechnologyTagDeleteModal = (props) => {
    // Container for all targeted Project_TechnologyTag database rows
    const [projectTechnologyTagData, setProjectTechnologyTagData] = useState([]);
    // Container for target TechnologyTag database row
    const [technologyTagData, setTechnologyTagData] = useState({});

    // HTTP Request status
    const [technologyTagError, setTechnologyTagError] = useState(null);
    const [isProjectTechnologyTagLoaded, setIsProjectTechnologyTagLoaded] = useState(false);
    const [projectTechnologyTagError, setProjectTechnologyTagError] = useState(null);
    const [isTechnologyTagLoaded, setIsTechnologyTagLoaded] = useState(false);

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    // Function to send message to parent component that submission has taken place and should close modal and refresh table
    function handleChange() {
        props.onChange();
    }

    // Handler method for submit button
    const handleSubmit = async () => {
        if (projectTechnologyTagData.length !== 0) {
            projectTechnologyTagData.map(async (projectAssociation, i) => {
                await deleteProjectTechnologyTag(projectAssociation.projectID);
            });
            await deleteTechnologyTag();
        }
        else {
            await deleteTechnologyTag();
        }

    };

    const deleteTechnologyTag = async () => {
        return await fetch("/portfolio/technologyTag/" + props.technologyID,
            {
                method: "DELETE"
            }).then(setSubmitted(true));
    };

    const deleteProjectTechnologyTag = async (projectID) => {
        return await fetch("/portfolio/project_TechnologyTag/" + projectID + "/" + props.technologyID,
            {
                method: "DELETE"
            });
    };

    useEffect(() => {
        // Fetch targeted TechnologyTag database data via GET request
        fetch("/portfolio/technologyTag/" + props.technologyID)
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

        // Fetch targeted Project_TechnologyTag association database data via GET request
        fetch("/portfolio/project_TechnologyTag/technologyTagID/" + props.technologyID)
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectTechnologyTagData(result);
                    setIsProjectTechnologyTagLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setProjectTechnologyTagError(error);
                }
            );
    }, []);

    // If technologyTag has been deleted
    if (submitted) {
        handleChange();
    }
    // If HTTP or internal server error occurs
    if (projectTechnologyTagError) {
        return <div>Error: {projectTechnologyTagError.message}</div>;
    }
    if (technologyTagError) {
        return <div>Error: {technologyTagError.message}</div>;
    }
    // If any of the database data sets are not finished loading then keep displaying "Loading" indicator
    else if (!isTechnologyTagLoaded || !isProjectTechnologyTagLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <Paper style={styles.modalStyle} elevation={10} className="AdminTechnologyTagDeleteModal">
                <div style={styles.modalInner} className={"TechnologyTagDeleteModalInner"}>
                    <Typography color={"primary"} variant={"h4"}>
                        Delete TechnologyTag
                    </Typography>
                    <br/><br/><br/>
                    <Typography color={"primary"} variant={"h5"}>
                        TechnologyTag Info:
                    </Typography>
                    <br/><br/>
                    <Typography color={"primary"} variant={"body1"}>
                        TechnologyID: {technologyTagData.technologyID}
                    </Typography>
                    <br/>
                    <Typography color={"primary"} variant={"body1"}>
                        Technology Tag Name: {technologyTagData.technologyName}
                    </Typography>
                    <br/><br/>
                    <Typography color={"primary"} variant={"h5"}>
                        Projects Associated Info (ProjectID's):
                    </Typography>

                    {
                        projectTechnologyTagData.map((projectAssociation, i) => {
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

export default AdminTechnologyTagDeleteModal;
