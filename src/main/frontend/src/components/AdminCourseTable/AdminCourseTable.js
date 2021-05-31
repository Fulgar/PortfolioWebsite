import React, {useEffect, useState} from 'react';
import './AdminCourseTable.css';
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
import AdminCourseDeleteModal from "./AdminCourseDeleteModal/AdminCourseDeleteModal";
import AdminCourseEditModal from "./AdminCourseEditModal/AdminCourseEditModal";

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

const AdminCourseTable = (props) => {
    // Contains corresponding labels and properties for Table head
    const [header, setHeader] = useState([
        {
            name: "Course Name",
            prop: "courseName"
        },
        {
            name: "Subject Name",
            prop: "subjectName"
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
    const [courseData, setCourseData] = useState([]);

    // HTTP Request status
    const [error, setError] = useState(null);
    const [isCourseLoaded, setIsCourseLoaded] = useState(false);

    // Course Delete Modal fields
    const [courseDeleteOpen, setCourseDeleteOpen] = useState(false);
    const handleCourseDeleteOpen = () => {
        setCourseDeleteOpen(true);
    };
    const handleCourseDeleteClose = () => {
        setCourseDeleteOpen(false);
    };
    // Represents the row that is selected for deletion
    const [deleteSelectID, setDeleteSelectID] = useState(-1);

    const deleteModal = (courseID) => {
        setDeleteSelectID(courseID);
        handleCourseDeleteOpen();
    };
    // Re-render count from deletion
    const [deleteRenderCount, setDeleteRenderCount] = useState(0);
    const handleCourseDeleteUpdate = () => {
        handleCourseDeleteClose();
        setDeleteRenderCount(deleteRenderCount + 1);
    };


    // Course Edit Modal fields
    const [courseEditOpen, setCourseEditOpen] = useState(false);
    const handleCourseEditOpen = () => {
        setCourseEditOpen(true);
    };
    const handleCourseEditClose = () => {
        setCourseEditOpen(false);
    };
    // Represents the row that is selected for editing
    const [editSelectID, setEditSelectID] = useState(-1);

    const editModal = (courseID) => {
        setEditSelectID(courseID);
        handleCourseEditOpen();
    };
    // Re-render count from edit-update
    const [editRenderCount, setEditRenderCount] = useState(0);
    const handleCourseEditUpdate = () => {
        handleCourseEditClose();
        setEditRenderCount(editRenderCount + 1);
    };

    // Is executed only on first render of component and upon update of addRenderCount
    useEffect(() => {
        // Fetch all Course database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/course/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setCourseData(result);
                    setIsCourseLoaded(true);
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
    else if (!isCourseLoaded) {
        return <div>Loading...</div>;
    }
    else {
        // If bodyData has already been set, then this execution is a rerender and should not not be re-executed
        if (bodyData.length === 0) {
            let newBodyData = [];
            for (let i = 0; i < courseData.length; i++) {
                // Set various table course fields
                const courseDataObj = courseData[i];
                let courseID = courseDataObj["courseID"];
                let courseName = courseDataObj["courseName"];
                let subjectName = courseDataObj["subjectName"];

                // Push table body data to temp container
                newBodyData.push({
                    courseID: courseID,
                    courseName: courseName,
                    subjectName: subjectName
                });
            }



            // Sets the state field of bodyData to new data
            setBodyData(newBodyData);
        }

        return (
            <div className="AdminCourseTable">
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
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.courseName}</span></TableCell>
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.subjectName}</span></TableCell>
                                            <TableCell style={styles.tableBodyCell}>
                                                <span style={styles.tableBodyCellInner}>
                                                    <a style={{cursor: "pointer"}} onClick={() => {editModal(body.courseID)}}><EditIcon/></a>
                                                </span>
                                            </TableCell>
                                            <TableCell style={styles.tableBodyCell}>
                                                <span style={styles.tableBodyCellInner}>
                                                    <a style={{cursor: "pointer"}} onClick={() => {deleteModal(body.courseID)}}><DeleteIcon/></a>
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
                    className={"admin-course-delete-modal"}
                    open={courseDeleteOpen}
                    onClose={handleCourseDeleteClose}
                >
                    <AdminCourseDeleteModal courseID={deleteSelectID} onChange={() => {handleCourseDeleteUpdate()}}/>
                </Modal>

                <Modal
                    className={"admin-course-edit-modal"}
                    open={courseEditOpen}
                    onClose={handleCourseEditClose}
                >
                    <AdminCourseEditModal courseID={editSelectID} onChange={() => {handleCourseEditUpdate()}}/>
                </Modal>
            </div>
        );
    }

};

export default AdminCourseTable;
