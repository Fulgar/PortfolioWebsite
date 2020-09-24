import React, {useEffect, useState} from 'react';
import './AdminDemoMediaDeleteModal.css';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const styles = {
    modalStyle: {
        width: 750,
        height: 750,
        position: "absolute",
        left: 50 + "%",
        top: 50 + "%",
        transform: "translate(-50%, -50%)",
        display: "flex", justifyContent: "center", textAlign: "center",
        padding: 7 + "em"
    },
    form: {
        display: "block", alignItems: "center"
    },
    formContent: {
        margin: "2em auto", minWidth: 10 + "em", display: "flex",
    }
};

const AdminDemoMediaDeleteModal = (props) => {
    // Form data
    const [newDemoMediaID] = useState(props.mode === "projectAdd" ? "" : props.demoMediaID);
    const [newDemoMediaTitle, setNewDemoMediaTitle] = useState(props.mode === "projectAdd" ? props.selectedDemoDataObj["mediaTitle"] : "");
    const [newDemoMediaCaption, setNewDemoMediaCaption] = useState(props.mode === "projectAdd" ? props.selectedDemoDataObj["mediaCaption"] : "");
    const [newDemoMediaType, setNewDemoMediaType] = useState(props.mode === "projectAdd" ? props.selectedDemoDataObj["mediaType"] : "");
    const [newDemoMediaURL, setNewDemoMediaURL] = useState(props.mode === "projectAdd" ? props.selectedDemoDataObj["url"] : "");
    const [newDemoMediaProjectID] = useState(props.mode === "projectAdd" ? "" : props.projectID);

    // HTTP GET status
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Called when submission button is clicked
    const handleSubmit = async () => {
        if (props.mode === "projectEdit") {
            await fetch("/portfolio/demoMedia/" + newDemoMediaID,
                {
                    method: "DELETE"
                }).then(props.onChange());
        }
    };

    // Will be called only on the first render of component
    useEffect(() => {
        if (props.mode === "projectAdd") {
            setIsDataLoaded(true);
        }
        if (props.mode === "projectEdit") {
            // Fetch all DemoMedia database data via GET request
            fetch("/portfolio/demoMedia/" + newDemoMediaID)
                .then(res => res.json())
                .then(
                    (result) => {
                        setNewDemoMediaTitle(result["mediaTitle"]);
                        setNewDemoMediaCaption(result["mediaCaption"]);
                        setNewDemoMediaType(result["mediaType"]);
                        setNewDemoMediaURL(result["url"]);
                        setIsDataLoaded(true);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
        }
    }, []);

    // If demoMedia data has been obtained
    if (isDataLoaded) {
        return (
            <Paper style={styles.modalStyle} elevation={10} className="AdminDemoMediaDeleteModal">
                <div className={"DemoMediaDeleteModalInner"}>
                    <Typography color={"primary"} variant={"h4"}>
                        Delete DemoMedia
                    </Typography>
                    <br/><br/><br/><br/>
                    <Typography color={"primary"} variant={"h5"}>
                        DemoMedia Info
                    </Typography>
                    <br/><br/>

                    <Typography color={"primary"} variant={"body1"}>
                        ID: {props.mode === "projectAdd" ? "N/A" : newDemoMediaID}
                    </Typography>
                    <br/>

                    <Typography color={"primary"} variant={"body1"}>
                        URL: {newDemoMediaURL}
                    </Typography>
                    <br/>

                    <Typography color={"primary"} variant={"body1"}>
                        Type: {newDemoMediaType}
                    </Typography>
                    <br/>

                    <Typography color={"primary"} variant={"body1"}>
                        Title: {newDemoMediaTitle}
                    </Typography>
                    <br/>

                    <Typography color={"primary"} variant={"body1"}>
                        Caption: {newDemoMediaCaption}
                    </Typography>
                    <br/>

                    <Typography color={"primary"} variant={"body1"}>
                        Project ID: {props.mode === "projectAdd" ? "N/A" : newDemoMediaProjectID}
                    </Typography>
                    <br/><br/>

                    <Button color={"primary"} variant={"contained"} onClick={async () => { await handleSubmit()}}>
                        Confirm Delete
                    </Button>
                </div>

            </Paper>
        );
    }
    else {
        return (
            <div>
                Loading...
            </div>
        );
    }
};

export default AdminDemoMediaDeleteModal;
