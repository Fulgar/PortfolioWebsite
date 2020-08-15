import React, {useState} from 'react';
import './AdminTechnologyTagAddModal.css';
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

const AdminTechnologyTagAddModal = (props) => {
    // Form data
    const [newTechnologyName, setNewTechnologyName] = useState("");

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    function handleChange() {
        props.onChange();
    }

    const handleSubmit = async () => {
        const data = {
            "technologyName": newTechnologyName
        };

        const response = await fetch("/portfolio/technologyTag/create",
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
        <Paper style={styles.modalStyle} elevation={10} className="AdminTechnologyTagAddModal">
            <div className={"TechnologyTagAddModalInner"}>
                <Typography color={"primary"} variant={"h4"}>
                    Create TechnologyTag
                </Typography>
                <br/><br/><br/><br/>
                <form autoComplete={"off"}>
                    <TextField
                        required
                        id={"technologyNameInput"}
                        label={"Technology Tag Name"}
                        defaultValue={""}
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
};


export default AdminTechnologyTagAddModal;
