import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './AdminContributorTable.css';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Modal from "@material-ui/core/Modal";
import AdminContributorDeleteModal from "./AdminContributorDeleteModal/AdminContributorDeleteModal";
import AdminContributorEditModal from "./AdminContributorEditModal/AdminContributorEditModal";

// Styles Object
const styles = {
    tableBodyCell: {
        borderLeftWidth: 1 + "px", borderRightWidth: 1 + "px",
        borderLeftStyle: "solid", borderRightStyle: "solid",
        borderTopWidth: 0 + "px", borderBottomWidth: 0 + "px",
        borderColor: "#242F40"
    },
    tableBodyCellInner: {
        display: "flex", justifyContent: "center", alignItems: "center"
    },
    tableHeadCell: {
        borderLeftWidth: 1 + "px", borderRightWidth: 1 + "px",
        borderLeftStyle: "solid", borderRightStyle: "solid",
        borderTopWidth: 0 + "px", borderBottomWidth: 0 + "px",
        borderColor: "#242F40"
    },
    tableHeadCellInner: {
        display: "flex", justifyContent: "center", alignItems: "center"
    },
    tableHead: {
        borderBottomWidth: 1 + "px", borderBottomStyle: "solid", borderColor: "#242F40"
    },
    table: {
        borderWidth: 1 + "px", borderBottomWidth: 2 + "px", borderRightWidth: 2 + "px",
        borderColor: "#242F40", borderStyle: "solid"
    }
};

const AdminContributorTable = (props) => {
    // Contains corresponding labels and properties for Table head
    const [header, setHeader] = useState([
        {
            name: "First Name",
            prop: "firstName"
        },
        {
            name: "Last Name",
            prop: "lastName"
        },
        {
            name: "Github Profile",
            prop: "githubProfileLink"
        },
        {
            name: "Edit",
            prop: "edit"
        },
        {
            name: "Delete",
            prop: "delete"
        }
    ]);

    // Contains table body data
    const [bodyData, setBodyData] = useState([]);

    // Container for all Project database rows
    const [contributorData, setContributorData] = useState([]);

    // HTTP Request status
    const [error, setError] = useState(null);
    const [isContributorLoaded, setIsContributorLoaded] = useState(false);

    // Contributor Delete Modal fields
    const [contributorDeleteOpen, setContributorDeleteOpen] = useState(false);
    const handleContributorDeleteOpen = () => {
        setContributorDeleteOpen(true);
    };
    const handleContributorDeleteClose = () => {
        setContributorDeleteOpen(false);
    };
    // Represents the row that is selected for deletion
    const [deleteSelectID, setDeleteSelectID] = useState(-1);

    const deleteModal = (contributorID) => {
        setDeleteSelectID(contributorID);
        handleContributorDeleteOpen();
    };
    // Re-render count from deletion
    const [deleteRenderCount, setDeleteRenderCount] = useState(0);
    const handleContributorDeleteUpdate = () => {
        handleContributorDeleteClose();
        setDeleteRenderCount(deleteRenderCount + 1);
    };


    // Contributor Edit Modal fields
    const [contributorEditOpen, setContributorEditOpen] = useState(false);
    const handleContributorEditOpen = () => {
        setContributorEditOpen(true);
    };
    const handleContributorEditClose = () => {
        setContributorEditOpen(false);
    };
    // Represents the row that is selected for editing
    const [editSelectID, setEditSelectID] = useState(-1);

    const editModal = (contributorID) => {
        setEditSelectID(contributorID);
        handleContributorEditOpen();
    };
    // Re-render count from edit-update
    const [editRenderCount, setEditRenderCount] = useState(0);
    const handleContributorEditUpdate = () => {
        handleContributorEditClose();
        setEditRenderCount(editRenderCount + 1);
    };

    // Is executed only on first render of component and upon update of addRenderCount
    useEffect(() => {
        // Fetch all Contributor database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/contributor/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setContributorData(result);
                    setIsContributorLoaded(true);
                    setBodyData([]);
                },
                (error) => {
                    console.error(error);
                    setError(error);
                }
            );
    }, [props.addRenderCount, deleteRenderCount, editRenderCount]);

    // If HTTP or internal server error occurs
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    // If any of the database data sets are not finished loading then keep displaying "Loading" indicator
    else if (!isContributorLoaded) {
        return <div>Loading...</div>;
    }
    else {
        // If bodyData has already been set, then this execution is a rerender and should not not be re-executed
        if (bodyData.length === 0) {
            let newBodyData = [];
            for (let i = 0; i < contributorData.length; i++) {
                // Set various table contributor fields
                const contributorDataObj = contributorData[i];
                let contributorID = contributorDataObj["contributorID"];
                let firstName = contributorDataObj["firstName"];
                let lastName = contributorDataObj["lastName"];
                let githubProfile = contributorDataObj["githubProfileLink"];

                // Push table body data to temp container
                newBodyData.push({
                    contributorID: contributorID,
                    firstName: firstName,
                    lastName: lastName,
                    githubProfileLink: githubProfile
                });
            }



            // Sets the state field of bodyData to new data
            setBodyData(newBodyData);
        }

        return (
            <div className="AdminContributorTable">
                <TableContainer>
                    <Table style={styles.table}>
                        <TableHead style={styles.tableHead}>
                            <TableRow component={Paper} elevation={15}>
                                {
                                    header.map((head, i) => {
                                        return <TableCell style={styles.tableHeadCell} key={`th-${i}`}>
                                            <div style={styles.tableHeadCellInner}>
                                                <span>{head.name}</span>
                                            </div>
                                        </TableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                bodyData.map((body, i) => {
                                    // Only return body row if there are no current filter rules against it
                                    return (
                                        <TableRow component={Paper} elevation={15} key={`tr-${i}`}>
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.firstName}</span></TableCell>
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.lastName}</span></TableCell>
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.githubProfileLink}</span></TableCell>
                                            <TableCell style={styles.tableBodyCell}>
                                                <span style={styles.tableBodyCellInner}>
                                                    <a style={{cursor: "pointer"}} onClick={() => {editModal(body.contributorID)}}><EditIcon/></a>
                                                </span>
                                            </TableCell>
                                            <TableCell style={styles.tableBodyCell}>
                                                <span style={styles.tableBodyCellInner}>
                                                    <a style={{cursor: "pointer"}} onClick={() => {deleteModal(body.contributorID)}}><DeleteIcon/></a>
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                    className={"admin-contributor-delete-modal"}
                    open={contributorDeleteOpen}
                    onClose={handleContributorDeleteClose}
                >
                    <AdminContributorDeleteModal contributorID={deleteSelectID} onChange={() => {handleContributorDeleteUpdate()}}/>
                </Modal>

                <Modal
                    className={"admin-contributor-edit-modal"}
                    open={contributorEditOpen}
                    onClose={handleContributorEditClose}
                >
                    <AdminContributorEditModal contributorID={editSelectID} onChange={() => {handleContributorEditUpdate()}}/>
                </Modal>
            </div>
        );
    }

};

export default AdminContributorTable;
