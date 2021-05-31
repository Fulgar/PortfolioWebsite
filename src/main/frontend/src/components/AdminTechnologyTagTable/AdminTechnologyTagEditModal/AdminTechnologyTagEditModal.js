import React, {useEffect, useState} from 'react';
import './AdminTechnologyTagEditModal.css';
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

const AdminTechnologyTagEditModal = (props) => {
    // Container for target TechnologyTag database row
    const [technologyTagData, setTechnologyTagData] = useState({});

    // HTTP Request status
    const [technologyTagError, setTechnologyTagError] = useState(null);
    const [isTechnologyTagLoaded, setIsTechnologyTagLoaded] = useState(false);

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    // Form data
    const [newTechnologyName, setNewTechnologyName] = useState("");

    // Function to send message to parent component that submission has taken place and should close modal and refresh table
    function handleChange() {
        props.onChange();
    }

    // Handler method for submit button
    const handleSubmit = async () => {
        await editTechnologyTag();
    };

    const editTechnologyTag = async () => {
        const data = {
            "technologyID": props.technologyID,
            "technologyName": newTechnologyName,
        };

        return await fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/technologyTag/update",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(setSubmitted(true));
    };

    useEffect(() => {
        // Fetch targeted TechnologyTag database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/technologyTag/" + props.technologyID)
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
    }, []);

    useEffect(() => {
        if (technologyTagData !== {}) {
            setNewTechnologyName(technologyTagData["technologyName"]);
        }
    }, [technologyTagData]);

    // If technologyTag has been edited
    if (submitted) {
        handleChange();
    }
    // If HTTP or internal server error occurs
    if (technologyTagError) {
        return <div>Error: {technologyTagError.message}</div>;
    }
    // If any of the database data sets are not finished loading then keep displaying "Loading" indicator
    else if (!isTechnologyTagLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <Paper style={styles.modalStyle} elevation={10} className="AdminTechnologyTagEditModal">
                <div style={styles.modalInner} className={"TechnologyTagEditModalInner"}>
                    <Typography color={"primary"} variant={"h4"}>
                        Edit TechnologyTag
                    </Typography>
                    <br/><br/><br/><br/>
                    <form autoComplete={"off"}>
                        <TextField
                            required
                            id={"technologyNameInput"}
                            label={"Technology Tag Name"}
                            defaultValue={newTechnologyName}
                            variant={"outlined"}
                            onChange={(e) => {setNewTechnologyName(e.target.value)}}
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

export default AdminTechnologyTagEditModal;
