import React, {useEffect, useState} from 'react';
import './AdminLogin.css';
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router-dom";

const styles = {
  mainPaper: {
      padding: 5 + "em",
      width: 30 + "%",
      margin: "auto",
      borderColor: "#CCA43B",
      borderWidth: 0.40 + "em"
}
};


const AdminLogin = (props) => {
    function handleChange(newValue) {
        props.onChange(newValue);
    }

    const sendLoginRequest = () => {
        const url = "/portfolio/getAuthorization";
        // Fetch all Project database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result === true) {
                        handleChange(true);
                        // return (<Redirect to={"/admin/view"}/>);
                    }
                    else {
                        handleChange(false);
                    }
                },
                (error) => {
                    handleChange(false);
                    console.error(error);
                }
            );
    };

    return (
        <div className="AdminLogin">
            <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
                ADMIN LOGIN
            </Typography>
            <Paper variant={"outlined"} style={styles.mainPaper}>
                <Button onClick={() => {sendLoginRequest()}} variant={"contained"} color={"primary"}>
                    Login
                </Button>
            </Paper>
        </div>
);
};

export default AdminLogin;
