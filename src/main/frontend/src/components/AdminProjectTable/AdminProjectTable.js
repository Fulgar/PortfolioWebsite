import React, {useEffect, useState} from 'react';
import './AdminProjectTable.css';
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
import AdminProjectDeleteModal from "./AdminProjectDeleteModal/AdminProjectDeleteModal";
import AdminProjectEditModal from "./AdminProjectEditModal/AdminProjectEditModal";

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

const AdminProjectTable = (props) => {
    // Contains corresponding labels and properties for Table head
    const [header, setHeader] = useState([
        {
            name: "Project Title",
            prop: "projectTitle"
        },
        {
            name: "Project Type",
            prop: "projectTypeName"
        },
        {
            name: "Course Name",
            prop: "courseName"
        },
        {
            name: "Contributor Count",
            prop: "contributorCount"
        },
        {
            name: "Tech Tags",
            prop: "technologyTags"
        },
        {
            name: "DemoMedia Count",
            prop: "demoMediaCount"
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
    const [projectData, setProjectData] = useState([]);

    // Container for all ProjectType database rows
    const [projectTypeData, setProjectTypeData] = useState([]);

    // Container for all Course database rows
    const [courseData, setCourseData] = useState([]);

    // Container for all DemoMedia database rows
    const [demoMediaData, setDemoMediaData] = useState([]);

    // Container for all Project_Contributor database rows
    const [projectContributorData, setProjectContributorData] = useState([]);

    // Container for all TechnologyTag database rows
    const [technologyTagData, setTechnologyTagData] = useState([]);

    // Container for all Project_TechnologyTag database rows
    const [projectTechnologyTagData, setProjectTechnologyTagData] = useState([]);

    // HTTP Request status
    const [projectError, setProjectError] = useState(null);
    const [isProjectLoaded, setIsProjectLoaded] = useState(false);
    const [projectTypeError, setProjectTypeError] = useState(null);
    const [isProjectTypeLoaded, setIsProjectTypeLoaded] = useState(false);
    const [courseError, setCourseError] = useState(null);
    const [isCourseLoaded, setIsCourseLoaded] = useState(false);
    const [demoMediaError, setDemoMediaError] = useState(null);
    const [isDemoMediaLoaded, setIsDemoMediaLoaded] = useState(false);
    const [projectContributorError, setProjectContributorError] = useState(null);
    const [isProjectContributorLoaded, setIsProjectContributorLoaded] = useState(false);
    const [technologyTagError, setTechnologyTagError] = useState(null);
    const [isTechnologyTagLoaded, setIsTechnologyTagLoaded] = useState(false);
    const [projectTechnologyTagError, setProjectTechnologyTagError] = useState(null);
    const [isProjectTechnologyTagLoaded, setIsProjectTechnologyTagLoaded] = useState(false);

    // Project Delete Modal fields
    const [projectDeleteOpen, setProjectDeleteOpen] = useState(false);
    const handleProjectDeleteOpen = () => {
        setProjectDeleteOpen(true);
    };
    const handleProjectDeleteClose = () => {
        setProjectDeleteOpen(false);
    };
    // Represents the row that is selected for deletion
    const [deleteSelectID, setDeleteSelectID] = useState(-1);

    const deleteModal = (projectID) => {
        setDeleteSelectID(projectID);
        handleProjectDeleteOpen();
    };
    // Re-render count from deletion
    const [deleteRenderCount, setDeleteRenderCount] = useState(0);
    const handleProjectDeleteUpdate = () => {
        handleProjectDeleteClose();
        setDeleteRenderCount(deleteRenderCount + 1);
    };


    // Project Edit Modal fields
    const [projectEditOpen, setProjectEditOpen] = useState(false);
    const handleProjectEditOpen = () => {
        setProjectEditOpen(true);
    };
    const handleProjectEditClose = () => {
        setProjectEditOpen(false);
    };
    // Represents the row that is selected for editing
    const [editSelectID, setEditSelectID] = useState(-1);

    const editModal = (projectID) => {
        setEditSelectID(projectID);
        handleProjectEditOpen();
    };
    // Re-render count from edit-update
    const [editRenderCount, setEditRenderCount] = useState(0);
    const handleProjectEditUpdate = () => {
        handleProjectEditClose();
        setEditRenderCount(editRenderCount + 1);
    };

    // Is executed only on first render of component and upon update of addRenderCount
    useEffect(() => {
        // Fetch all Project database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/project/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectData(result);
                    setIsProjectLoaded(true);
                    setBodyData([]);
                },
                (error) => {
                    console.error(error);
                    setProjectError(error);
                }
            );

        // Fetch all ProjectType database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/projectType/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectTypeData(result);
                    setIsProjectTypeLoaded(true);
                    setBodyData([]);
                },
                (error) => {
                    console.error(error);
                    setProjectTypeError(error);
                }
            );

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
                    setCourseError(error);
                }
            );

        // Fetch all DemoMedia database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/demoMedia/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setDemoMediaData(result);
                    setIsDemoMediaLoaded(true);
                    setBodyData([]);
                },
                (error) => {
                    console.error(error);
                    setDemoMediaError(error);
                }
            );

        // Fetch all Project_Contributor database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/project_contributor/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectContributorData(result);
                    setIsProjectContributorLoaded(true);
                    setBodyData([]);
                },
                (error) => {
                    console.error(error);
                    setProjectContributorError(error);
                }
            );

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
                    setTechnologyTagError(error);
                }
            );

        // Fetch all Project_TechnologyTag database data via GET request
        fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/project_TechnologyTag/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectTechnologyTagData(result);
                    setIsProjectTechnologyTagLoaded(true);
                    setBodyData([]);
                },
                (error) => {
                    console.error(error);
                    setProjectTechnologyTagError(error);
                }
            );
    }, [props.addRenderCount, deleteRenderCount, editRenderCount]);

    // If any of the database data sets are not finished loading then keep displaying "Loading" indicator
    if (!isProjectLoaded || !isProjectTypeLoaded || !isCourseLoaded || !isDemoMediaLoaded || !isProjectContributorLoaded
        || !isTechnologyTagLoaded || !isProjectTechnologyTagLoaded) {
        return <div>Loading...</div>;
    }
    else {
        // If bodyData has already been set, then this execution is a rerender and should not not be re-executed
        if (bodyData.length === 0) {
            let newBodyData = [];
            for (let i = 0; i < projectData.length; i++) {
                // Set various table project fields
                const projectDataObj = projectData[i];
                let projectID = projectDataObj["projectID"];
                let projectTitle = projectDataObj["title"];

                let projectTypeID = projectDataObj["projectTypeID"];
                let projectTypeName = "";
                const projectTypeDataObj = projectTypeData.find(element => element["projectTypeID"] === projectTypeID);
                projectTypeName = projectTypeDataObj["name"];

                let courseID = projectDataObj["courseID"];
                let courseName = "";
                if (courseID !== undefined) {
                    const courseDataObj = courseData.find(element => element["courseID"] === courseID);
                    courseName = courseDataObj["courseName"];
                }

                let contributorCount = 0;
                for (let j = 0; j < projectContributorData.length; j++) {
                    const projectContributorDataObj = projectContributorData[j];
                    if (projectContributorDataObj["projectID"] === projectID) {
                        contributorCount++;
                    }
                }

                let technologyTags = [];
                for (let j = 0; j < projectTechnologyTagData.length; j++) {
                    const projectTechnologyTagDataObj = projectTechnologyTagData[j];
                    if (projectTechnologyTagDataObj["projectID"] === projectID) {
                        let technologyID = projectTechnologyTagDataObj["technologyTagID"];
                        const technologyTagDataObj = technologyTagData.find(element => element["technologyID"] === technologyID);
                        let technologyTagName = technologyTagDataObj["technologyName"];
                        technologyTags.push(technologyTagName);
                    }
                }

                let demoMediaCount = 0;
                for (let j = 0; j < demoMediaData.length; j++) {
                    const demoMediaDataObj = demoMediaData[j];
                    if (demoMediaDataObj["projectID"] === projectID) {
                        demoMediaCount++;
                    }
                }

                // Push table body data to temp container
                newBodyData.push({
                    projectID: projectID,
                    projectTitle: projectTitle,
                    projectTypeName: projectTypeName,
                    courseName: courseName,
                    contributorCount: contributorCount,
                    technologyTags: technologyTags,
                    demoMediaCount: demoMediaCount
                });
            }



            // Sets the state field of bodyData to new data
            setBodyData(newBodyData);
        }

        return (
            <div className="AdminProjectTable">
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
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>
                                                <a href={`/projects/${body.projectID}`}>{body.projectTitle}</a>
                                            </span></TableCell>
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.projectTypeName}</span></TableCell>
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.courseName}</span></TableCell>
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.contributorCount}</span></TableCell>
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.technologyTags.join(", ")}</span></TableCell>
                                            <TableCell style={styles.tableBodyCell}><span style={styles.tableBodyCellInner}>{body.demoMediaCount}</span></TableCell>
                                            <TableCell style={styles.tableBodyCell}>
                                                <span style={styles.tableBodyCellInner}>
                                                    <a style={{cursor: "pointer"}} onClick={() => {editModal(body.projectID)}}><EditIcon/></a>
                                                </span>
                                            </TableCell>
                                            <TableCell style={styles.tableBodyCell}>
                                                <span style={styles.tableBodyCellInner}>
                                                    <a style={{cursor: "pointer"}} onClick={() => {deleteModal(body.projectID)}}><DeleteIcon/></a>
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
                    className={"admin-project-delete-modal"}
                    open={projectDeleteOpen}
                    onClose={handleProjectDeleteClose}
                >
                    <AdminProjectDeleteModal projectID={deleteSelectID} onChange={() => {handleProjectDeleteUpdate()}}/>
                </Modal>

                <Modal
                    className={"admin-project-edit-modal"}
                    open={projectEditOpen}
                    onClose={handleProjectEditClose}
                >
                    <AdminProjectEditModal projectID={editSelectID} onChange={() => {handleProjectEditUpdate()}}/>
                </Modal>
            </div>
        );
    }

};

export default AdminProjectTable;
