import React, {useEffect, useState} from 'react';
import './AdminTechnologyTagTable.css';
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
import AdminTechnologyTagDeleteModal from "./AdminTechnologyTagDeleteModal/AdminTechnologyTagDeleteModal";
import AdminTechnologyTagEditModal from "./AdminTechnologyTagEditModal/AdminTechnologyTagEditModal";

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

const AdminTechnologyTagTable = (props) => {
    // Contains corresponding labels and properties for Table head
    const [header, setHeader] = useState([
        {
            name: "Technology Tag Name",
            prop: "technologyName"
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
    const [technologyTagData, setTechnologyTagData] = useState([]);

    // HTTP Request status
    const [error, setError] = useState(null);
    const [isTechnologyTagLoaded, setIsTechnologyTagLoaded] = useState(false);

    // TechnologyTag Delete Modal fields
    const [technologyTagDeleteOpen, setTechnologyTagDeleteOpen] = useState(false);
    const handleTechnologyTagDeleteOpen = () => {
        setTechnologyTagDeleteOpen(true);
    };
    const handleTechnologyTagDeleteClose = () => {
        setTechnologyTagDeleteOpen(false);
    };
    // Represents the row that is selected for deletion
    const [deleteSelectID, setDeleteSelectID] = useState(-1);

    const deleteModal = (technologyID) => {
        setDeleteSelectID(technologyID);
        handleTechnologyTagDeleteOpen();
    };
    // Re-render count from deletion
    const [deleteRenderCount, setDeleteRenderCount] = useState(0);
    const handleTechnologyTagDeleteUpdate = () => {
        handleTechnologyTagDeleteClose();
        setDeleteRenderCount(deleteRenderCount + 1);
    };


    // TechnologyTag Edit Modal fields
    const [technologyTagEditOpen, setTechnologyTagEditOpen] = useState(false);
    const handleTechnologyTagEditOpen = () => {
        setTechnologyTagEditOpen(true);
    };
    const handleTechnologyTagEditClose = () => {
        setTechnologyTagEditOpen(false);
    };
    // Represents the row that is selected for editing
    const [editSelectID, setEditSelectID] = useState(-1);

    const editModal = (technologyID) => {
        setEditSelectID(technologyID);
        handleTechnologyTagEditOpen();
    };
    // Re-render count from edit-update
    const [editRenderCount, setEditRenderCount] = useState(0);
    const handleTechnologyTagEditUpdate = () => {
        handleTechnologyTagEditClose();
        setEditRenderCount(editRenderCount + 1);
    };

    // Is executed only on first render of component and upon update of addRenderCount
    useEffect(() => {
        // Fetch all TechnologyTag database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/technologyTag/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setTechnologyTagData(result);
                    setIsTechnologyTagLoaded(true);
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
    else if (!isTechnologyTagLoaded) {
        return <div>Loading...</div>;
    }
    else {
        // If bodyData has already been set, then this execution is a rerender and should not not be re-executed
        if (bodyData.length === 0) {
            let newBodyData = [];
            for (let i = 0; i < technologyTagData.length; i++) {
                // Set various table technologyTag fields
                const technologyTagDataObj = technologyTagData[i];
                let technologyID = technologyTagDataObj["technologyID"];
                let technologyTagName = technologyTagDataObj["technologyName"];

                // Push table body data to temp container
                newBodyData.push({
                    technologyID: technologyID,
                    technologyName: technologyTagName
                });
            }



            // Sets the state field of bodyData to new data
            setBodyData(newBodyData);
        }

        return (
            <div className="AdminTechnologyTagTable">
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
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.technologyName}</span></TableCell>
                                            <TableCell style={styles.tableBodyCell}>
                                                <span style={styles.tableBodyCellInner}>
                                                    <a style={{cursor: "pointer"}} onClick={() => {editModal(body.technologyID)}}><EditIcon/></a>
                                                </span>
                                            </TableCell>
                                            <TableCell style={styles.tableBodyCell}>
                                                <span style={styles.tableBodyCellInner}>
                                                    <a style={{cursor: "pointer"}} onClick={() => {deleteModal(body.technologyID)}}><DeleteIcon/></a>
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
                    className={"admin-technologyTag-delete-modal"}
                    open={technologyTagDeleteOpen}
                    onClose={handleTechnologyTagDeleteClose}
                >
                    <AdminTechnologyTagDeleteModal technologyID={deleteSelectID} onChange={() => {handleTechnologyTagDeleteUpdate()}}/>
                </Modal>

                <Modal
                    className={"admin-technologyTag-edit-modal"}
                    open={technologyTagEditOpen}
                    onClose={handleTechnologyTagEditClose}
                >
                    <AdminTechnologyTagEditModal technologyID={editSelectID} onChange={() => {handleTechnologyTagEditUpdate()}}/>
                </Modal>
            </div>
        );
    }

};

export default AdminTechnologyTagTable;
