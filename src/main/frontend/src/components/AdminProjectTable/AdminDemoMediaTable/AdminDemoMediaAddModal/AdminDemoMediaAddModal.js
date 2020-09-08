import React, {useEffect, useState} from 'react';
import './AdminDemoMediaAddModal.css';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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

const AdminDemoMediaAddModal = (props) => {
    // Form data
    const [newDemoMediaTitle, setNewDemoMediaTitle] = useState("");
    const [newDemoMediaCaption, setNewDemoMediaCaption] = useState("");
    const [newDemoMediaType, setNewDemoMediaType] = useState("");
    const [newDemoMediaURL, setNewDemoMediaURL] = useState("");
    const [newDemoMediaProjectID] = useState(
        props.mode === "projectAdd" ? "" : props.projectID
    );

    // Array of all accepted types of demoMedia
    const demoMediaTypeData = [
        "IMG",
        "VID",
        "TXT",
        "PDF"
    ];

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        console.log("newDemoMediaTitle = " + newDemoMediaTitle)
    }, [newDemoMediaTitle]);
    useEffect(() => {
        console.log("newDemoMediaCaption = " + newDemoMediaCaption)
    }, [newDemoMediaCaption]);
    useEffect(() => {
        console.log("newDemoMediaType = " + newDemoMediaType)
    }, [newDemoMediaType]);
    useEffect(() => {
        console.log("newDemoMediaURL = " + newDemoMediaURL)
    }, [newDemoMediaURL]);
    useEffect(() => {
        console.log("newDemoMediaProjectID = " + newDemoMediaProjectID)
    }, [newDemoMediaProjectID]);

    function handleChange(demoMediaData) {
        console.log("AdminDemoMediaAddModal - handleChange() - demoMediaData = " + demoMediaData);
        console.log(demoMediaData);
        props.onChange(demoMediaData);
    }

    const handleSubmit = async () => {
        const data = {
            "demoMediaID": "",
            "mediaTitle": newDemoMediaTitle,
            "mediaCaption": newDemoMediaCaption,
            "mediaType": newDemoMediaType,
            "url": newDemoMediaURL,
            "projectID": newDemoMediaProjectID
        };

        if (props.mode === "projectAdd") {
            handleChange(data);
        }
        if (props.mode === "projectEdit") {
            await fetch("/portfolio/demoMedia/create",
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
        }
    };

    if (submitted) {
        handleChange();
    }
    return (
        <Paper style={styles.modalStyle} elevation={10} className="AdminDemoMediaAddModal">
            <div className={"DemoMediaAddModalInner"}>
                <Typography color={"primary"} variant={"h4"}>
                    Create DemoMedia
                </Typography>
                <br/><br/><br/><br/>
                <form style={styles.form} autoComplete={"off"}>
                    <TextField
                        required
                        id={"demoMediaTitleInput"}
                        label={"DemoMedia Title"}
                        defaultValue={""}
                        variant={"outlined"}
                        style={styles.formContent}
                        onChange={(e) => {setNewDemoMediaTitle(e.target.value)}}
                    />

                    <TextField
                        required
                        id={"demoMediaCaptionInput"}
                        label={"Caption"}
                        defaultValue={""}
                        variant={"outlined"}
                        style={styles.formContent}
                        onChange={(e) => {setNewDemoMediaCaption(e.target.value)}}
                    />

                    <FormControl variant={"outlined"} style={styles.formContent}>
                        <InputLabel id="demoMediaType-select-label">Media Type</InputLabel>
                        <Select
                            required
                            className={"demoMediaType-select-form"}
                            labelId={"demoMediaType-select-label"}
                            label={"Media Type"}
                            value={newDemoMediaType}
                            onChange={(e) => {
                                setNewDemoMediaType(e.target.value)
                            }}
                        >
                            {demoMediaTypeData.map((demoMediaTypeStr, i) => (
                                <MenuItem key={i} value={demoMediaTypeStr}>
                                    <span>{demoMediaTypeStr}</span>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        required
                        id={"demoMediaURLInput"}
                        label={"URL"}
                        defaultValue={""}
                        variant={"outlined"}
                        style={styles.formContent}
                        onChange={(e) => {setNewDemoMediaURL(e.target.value)}}
                    />

                    <br/><br/>
                    <Button color={"primary"} variant={"contained"} onClick={async () => { await handleSubmit()}}>
                        Submit
                    </Button>
                </form>
            </div>

        </Paper>
    );
};


export default AdminDemoMediaAddModal;
