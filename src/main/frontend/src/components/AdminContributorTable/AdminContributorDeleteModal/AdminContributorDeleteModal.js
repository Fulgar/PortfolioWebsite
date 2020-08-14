import React from 'react';
import PropTypes from 'prop-types';
import './AdminContributorDeleteModal.css';
import Paper from "@material-ui/core/Paper";

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

const AdminContributorDeleteModal = (props) => {

    return (
        <Paper style={styles.modalStyle} elevation={10} className="AdminContributorDeleteModal">
            <span>AdminContributorDeleteModal Component {props.contributorID}</span>
        </Paper>
    );
};

export default AdminContributorDeleteModal;
