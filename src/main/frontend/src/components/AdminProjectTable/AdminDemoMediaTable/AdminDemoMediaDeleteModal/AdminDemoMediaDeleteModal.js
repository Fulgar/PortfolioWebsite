import React, {useState} from 'react';
import './AdminDemoMediaDeleteModal.css';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
    console.log(props.selectedDemoDataObj);
    // Form data
    const [newDemoMediaID] = useState(props.mode === "projectAdd" ? "" : props.selectedDemoDataObj["demoMediaID"]);
    const [newDemoMediaTitle] = useState(props.selectedDemoDataObj["mediaTitle"]);
    const [newDemoMediaCaption] = useState(props.selectedDemoDataObj["mediaCaption"]);
    const [newDemoMediaType] = useState(props.selectedDemoDataObj["mediaType"]);
    const [newDemoMediaURL] = useState(props.selectedDemoDataObj["url"]);
    const [newDemoMediaProjectID] = useState(
        props.mode === "projectAdd" ? "" : props.selectedDemoDataObj["projectID"]
    );

    const handleSubmit = async () => {
        if (props.mode === "projectEdit") {
            // TODO: Delete request
        }
        await props.onChange();
    };


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
};

export default AdminDemoMediaDeleteModal;
