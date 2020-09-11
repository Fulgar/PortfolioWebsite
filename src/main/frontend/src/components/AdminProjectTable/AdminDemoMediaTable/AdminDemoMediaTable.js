import React, {useEffect, useState} from 'react';
import './AdminDemoMediaTable.css';
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
import AdminDemoMediaDeleteModal from "./AdminDemoMediaDeleteModal/AdminDemoMediaDeleteModal";
import AdminDemoMediaEditModal from "./AdminDemoMediaEditModal/AdminDemoMediaEditModal";

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

const AdminDemoMediaTable = (props) => {
    // Contains corresponding labels and properties for Table head
    const header = [
        {
            name: "DemoMedia Title",
            prop: "mediaTitle"
        },
        {
            name: "URL",
            prop: "url"
        },
        {
            name: "Media Type",
            prop: "mediaType"
        },
        {
            name: "Edit",
            prop: "edit"
        },
        {
            name: "Delete",
            prop: "delete"
        }
    ];

    // Contains table body data
    const [bodyData, setBodyData] = useState(null);

    // Container for all targeted DemoMedia database rows by ProjectID if in projectEdit mode
    const [demoMediaData, setDemoMediaData] = useState([]);

    // HTTP Request status
    const [demoMediaError, setDemoMediaError] = useState(null);
    const [isDemoMediaLoaded, setIsDemoMediaLoaded] = useState(false);

    // DemoMedia Delete Modal fields
    const [demoMediaDeleteOpen, setDemoMediaDeleteOpen] = useState(false);
    const handleDemoMediaDeleteOpen = () => {
        setDemoMediaDeleteOpen(true);
    };
    const handleDemoMediaDeleteClose = () => {
        setDemoMediaDeleteOpen(false);
    };
    // Represents the row that is selected for deletion by ID
    const [deleteSelectID, setDeleteSelectID] = useState(-1);
    // Represents the row that is selected for deletion by array index of demoMediaData
    const [deleteIndex, setDeleteIndex] = useState(-1);

    const deleteModal = (demoMediaID, index) => {
        setDeleteSelectID(demoMediaID);
        setDeleteIndex(index);
        handleDemoMediaDeleteOpen();
    };
    // Re-render count from deletion
    const [deleteRenderCount, setDeleteRenderCount] = useState(0);
    const handleDemoMediaDeleteUpdate = () => {
        if (props.mode === "projectEdit") {
            handleDemoMediaDeleteClose();
            setDeleteRenderCount(deleteRenderCount + 1);
        }
        else if (props.mode === "projectAdd") {
            handleDemoMediaDeleteClose();
            // setDemoMediaData(newData);
            let tempData = [...demoMediaData];
            tempData.splice(deleteIndex, 1);
            setDemoMediaData([...tempData]);
            setBodyData(null);
        }
    };


    // DemoMedia Edit Modal fields
    const [demoMediaEditOpen, setDemoMediaEditOpen] = useState(false);
    const handleDemoMediaEditOpen = () => {
        setDemoMediaEditOpen(true);
    };
    const handleDemoMediaEditClose = () => {
        setDemoMediaEditOpen(false);
    };
    // Represents the row that is selected for editing by ID
    const [editSelectID, setEditSelectID] = useState(-1);
    // Represents the row that is selected for editing by array index of demoMediaData
    const [editIndex, setEditIndex] = useState(-1);

    const editModal = (demoMediaID, index) => {
        setEditSelectID(demoMediaID);
        setEditIndex(index);
        handleDemoMediaEditOpen();
    };
    // Re-render count from edit-update
    const [editRenderCount, setEditRenderCount] = useState(0);
    const handleDemoMediaEditUpdate = (newData) => {
        if (props.mode === "projectEdit") {
            handleDemoMediaEditClose();
            setEditRenderCount(editRenderCount + 1);
        }
        else if (props.mode === "projectAdd") {
            handleDemoMediaEditClose();
            let tempData = [...demoMediaData];
            tempData[editIndex] = newData;
            setDemoMediaData(tempData);
        }
    };

    // Is executed only on first render of component and upon update of addRenderCount
    useEffect(() => {
        // If Editing an existing project
        if (props.mode === "projectEdit") {
            // Fetch all DemoMedia database data via GET request
            fetch("/portfolio/demoMedia/byProject/" + props.projectID)
                .then(res => res.json())
                .then(
                    (result) => {
                        setDemoMediaData(result);
                        setIsDemoMediaLoaded(true);
                        setBodyData(null);
                    },
                    (error) => {
                        console.error(error);
                        setDemoMediaError(error);
                    }
                );
        }

        // If Adding a new non-existent project
        else if (props.mode === "projectAdd") {
            // console.log("Render: useEffect : projectAdd");
            // // If demoMedia was added then there should be a difference in data in the arrays
            // if (props.parentData !== demoMediaData) {
            //     setDemoMediaData(props.parentData);
            //     setIsDemoMediaLoaded(true);
            //     setBodyData(null);
            // }
        }

        else {
            console.error("props.mode not correctly set");
            console.error("props.mode = " + props.mode);
        }

    }, [props.addRenderCount, deleteRenderCount, editRenderCount]);

    // Render every time props.parentData is altered
    useEffect(() => {
        if (props.mode === "projectAdd") {
            if (props.parentData.length !== 0) {
                if (props.parentData !== demoMediaData) {
                    setDemoMediaData(props.parentData);

                    setIsDemoMediaLoaded(true);
                    setBodyData(null);
                }
            }
            else {
                if (demoMediaData.length === 0) {
                    setIsDemoMediaLoaded(true);
                    setBodyData(null);
                }
            }
        }
    }, [props.parentData]);

    // Render every time demoMediaData is altered
    useEffect(() => {
        if (props.mode === "projectAdd") {
            if (demoMediaData !== props.parentData) {
                props.handleDataChange(demoMediaData);
            }
        }
    }, [demoMediaData]);


    // if (props.mode === "projectEdit") {
    //
    // }


    // If any of the database data sets are not finished loading then keep displaying "Loading" indicator
    if (!isDemoMediaLoaded) {
        return <div>Loading...</div>;
    }
    else {
        // If bodyData has already been set, then this execution is a rerender and should not not be re-executed
        if (bodyData === null) {
            let newBodyData = [];
            if (demoMediaData.length > 0) {
                for (let i = 0; i < demoMediaData.length; i++) {
                    // Set various table demoMedia fields
                    const demoMediaDataObj = demoMediaData[i];
                    let demoMediaID = demoMediaDataObj["demoMediaID"];
                    let demoMediaTitle = demoMediaDataObj["mediaTitle"];
                    let demoMediaType = demoMediaDataObj["mediaType"];
                    let demoURL = demoMediaDataObj["url"];
                    let projectID = demoMediaDataObj["projectID"];

                    // Push table body data to temp container
                    newBodyData.push({
                        demoMediaID: demoMediaID,
                        mediaTitle: demoMediaTitle,
                        mediaType: demoMediaType,
                        url: demoURL,
                        projectID: projectID
                    });
                }
            }

            // Sets the state field of bodyData to new data
            setBodyData(newBodyData);
        }

        return (
            <div className="AdminDemoMediaTable">
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
                                (bodyData)
                                    ? bodyData.map((body, i) => {
                                        // Only return body row if there are no current filter rules against it
                                        return (
                                            <TableRow component={Paper} elevation={15} key={`tr-${i}`}>
                                                <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.mediaTitle}</span></TableCell>
                                                <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.url}</span></TableCell>
                                                <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.mediaType}</span></TableCell>
                                                <TableCell style={styles.tableBodyCell}>
                                                    <span style={styles.tableBodyCellInner}>
                                                        <a style={{cursor: "pointer"}} onClick={() => {editModal(body.demoMediaID, i)}}><EditIcon/></a>
                                                    </span>
                                                </TableCell>
                                                <TableCell style={styles.tableBodyCell}>
                                                    <span style={styles.tableBodyCellInner}>
                                                        <a style={{cursor: "pointer"}} onClick={() => {deleteModal(body.demoMediaID, i)}}><DeleteIcon/></a>
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                    : {}
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                    className={"admin-demoMedia-delete-modal"}
                    open={demoMediaDeleteOpen}
                    onClose={handleDemoMediaDeleteClose}
                >
                    {
                        props.mode === "projectAdd"
                            ? (
                                <AdminDemoMediaDeleteModal
                                    mode={props.mode}
                                    demoMediaIndex={deleteIndex}
                                    selectedDemoDataObj={demoMediaData[deleteIndex]}
                                    onChange={handleDemoMediaDeleteUpdate}
                                />
                            )
                            : (
                                <AdminDemoMediaDeleteModal
                                    mode={props.mode}
                                    demoMediaID={deleteSelectID}
                                    onChange={handleDemoMediaDeleteUpdate}
                                />
                            )
                    }

                </Modal>

                <Modal
                    className={"admin-demoMedia-edit-modal"}
                    open={demoMediaEditOpen}
                    onClose={handleDemoMediaEditClose}
                >
                    {
                        props.mode === "projectAdd"
                            ? (
                                <AdminDemoMediaEditModal
                                    mode={props.mode}
                                    demoMediaIndex={editIndex}
                                    selectedDemoDataObj={demoMediaData[editIndex]}
                                    onChange={(newDemoData) => {handleDemoMediaEditUpdate(newDemoData)}}
                                />
                            )
                            : (
                                <AdminDemoMediaEditModal
                                    mode={props.mode}
                                    demoMediaID={editSelectID}
                                    onChange={() => {handleDemoMediaEditUpdate(null)}}
                                />
                            )
                    }

                </Modal>
            </div>
        );
    }

};

export default AdminDemoMediaTable;
