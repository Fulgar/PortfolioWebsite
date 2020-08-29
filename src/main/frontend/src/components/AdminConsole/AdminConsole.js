import React, {useEffect, useState} from 'react';
import './AdminConsole.css';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AdminContributorTable from "../AdminContributorTable/AdminContributorTable";
import Modal from "@material-ui/core/Modal";
import AdminContributorAddModal from "../AdminContributorTable/AdminContributorAddModal/AdminContributorAddModal";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import AdminTechnologyTagTable from "../AdminTechnologyTagTable/AdminTechnologyTagTable";
import AdminTechnologyTagAddModal
    from "../AdminTechnologyTagTable/AdminTechnologyTagAddModal/AdminTechnologyTagAddModal";
import AdminCourseTable from "../AdminCourseTable/AdminCourseTable";
import AdminCourseAddModal from "../AdminCourseTable/AdminCourseAddModal/AdminCourseAddModal";
import AdminProjectTable from "../AdminProjectTable/AdminProjectTable";
import AdminProjectAddModal from "../AdminProjectTable/AdminProjectAddModal/AdminProjectAddModal";

const styles = {
    addButtonInner: {
        display: "flex", justifyContent: "center", alignItems: "center"
    },
    button: {
        marginRight: "auto", marginLeft: "auto", display: "block", marginBottom: 0.5 + "em"
    },
    paperLeft: {
        padding: 1 + "em", marginRight: 3 + "px"
    },
    paperCenter: {
        padding: 1 + "em"
    },
    paperRight: {
        padding: 1 + "em", marginLeft: 3 + "px"
    },
    paperTop: {
        padding: 1 + "em", marginBottom: 3 + "px"
    },
    paperInner: {
        display: "block"
    },
    triplePaperContainer: {
        display: "grid",
        gridTemplateColumns: "33.33% 33.33% 33.33%"
    },
};

const AdminConsole = (props) => {
    // Contributor Module fields
    // Contributor "Add" Modal fields
    const [contributorAddOpen, setContributorAddOpen] = useState(false);
    const handleContributorAddOpen = () => {
        setContributorAddOpen(true);
    };
    const handleContributorAddClose = () => {
        setContributorAddOpen(false);
    };
    const handleContributorAddUpdate = () => {
        handleContributorAddClose();
        setContributorRerenderCount(contributorRerenderCount + 1);
    };
    const [contributorRerenderCount, setContributorRerenderCount] = useState(0);


    // TechnologyTag Module fields
    // TechnologyTag "Add" Modal fields
    const [technologyTagAddOpen, setTechnologyTagAddOpen] = useState(false);
    const handleTechnologyTagAddOpen = () => {
        setTechnologyTagAddOpen(true);
    };
    const handleTechnologyTagAddClose = () => {
        setTechnologyTagAddOpen(false);
    };
    const handleTechnologyTagAddUpdate = () => {
        handleTechnologyTagAddClose();
        setTechnologyTagRerenderCount(technologyTagRerenderCount + 1);
    };
    const [technologyTagRerenderCount, setTechnologyTagRerenderCount] = useState(0);


    // Course Module fields
    // Course "Add" Modal fields
    const [courseAddOpen, setCourseAddOpen] = useState(false);
    const handleCourseAddOpen = () => {
        setCourseAddOpen(true);
    };
    const handleCourseAddClose = () => {
        setCourseAddOpen(false);
    };
    const handleCourseAddUpdate = () => {
        handleCourseAddClose();
        setCourseRerenderCount(courseRerenderCount + 1);
    };
    const [courseRerenderCount, setCourseRerenderCount] = useState(0);


    // Project Module fields
    // Project "Add" Modal fields
    const [projectAddOpen, setProjectAddOpen] = useState(false);
    const handleProjectAddOpen = () => {
        setProjectAddOpen(true);
    };
    const handleProjectAddClose = () => {
        setProjectAddOpen(false);
    };
    const handleProjectAddUpdate = () => {
        handleProjectAddClose();
        setProjectRerenderCount(projectRerenderCount + 1);
    };
    const [projectRerenderCount, setProjectRerenderCount] = useState(0);

    return (
        <div className="AdminConsole">
            <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
                ADMIN PANEL
            </Typography>

            <Paper style={styles.paperTop} className={"project-view"} elevation={10}>
                <div className={"paper-inner"} style={styles.paperInner}>
                    <span>
                        <Typography color={"primary"} variant={"h4"}>
                            Projects
                        </Typography>

                        <Button style={styles.button} variant={"contained"} color={"primary"} onClick={handleProjectAddOpen}>
                            <span style={styles.addButtonInner}><AddIcon/> Add Project</span>
                        </Button>
                    </span>


                    <AdminProjectTable addRenderCount={projectRerenderCount}/>
                    <Modal
                        className={"admin-project-add-modal"}
                        open={projectAddOpen}
                        onClose={handleProjectAddClose}
                    >
                        <AdminProjectAddModal onChange={() => {handleProjectAddUpdate()}}/>
                    </Modal>
                </div>
            </Paper>

            <div style={styles.triplePaperContainer}>
                <Paper style={styles.paperLeft} className={"contributor-view"} elevation={10}>
                    <div className={"paper-inner"} style={styles.paperInner}>
                        <span>
                            <Typography color={"primary"} variant={"h4"}>
                                Contributors
                            </Typography>

                            <Button style={styles.button} variant={"contained"} color={"primary"} onClick={handleContributorAddOpen}>
                                <span style={styles.addButtonInner}><AddIcon/> Add Contributor</span>
                            </Button>
                        </span>


                        <AdminContributorTable addRenderCount={contributorRerenderCount}/>
                        <Modal
                            className={"admin-contributor-add-modal"}
                            open={contributorAddOpen}
                            onClose={handleContributorAddClose}
                        >
                            <AdminContributorAddModal onChange={() => {handleContributorAddUpdate()}}/>
                        </Modal>
                    </div>
                </Paper>

                <Paper style={styles.paperCenter} className={"technology-tag-view"} elevation={10}>
                    <div className={"paper-inner"} style={styles.paperInner}>
                  <span>
                      <Typography color={"primary"} variant={"h4"}>
                          Technology Tags
                      </Typography>

                      <Button style={styles.button} variant={"contained"} color={"primary"} onClick={handleTechnologyTagAddOpen}>
                          <span style={styles.addButtonInner}><AddIcon/> Add Technology Tag</span>
                      </Button>
                  </span>


                        <AdminTechnologyTagTable addRenderCount={technologyTagRerenderCount} />
                        <Modal
                            className={"admin-technology-tag-add-modal"}
                            open={technologyTagAddOpen}
                            onClose={handleTechnologyTagAddClose}
                        >
                            <AdminTechnologyTagAddModal onChange={() => {handleTechnologyTagAddUpdate()}}/>
                        </Modal>
                    </div>
                </Paper>

                <Paper style={styles.paperRight} className={"course-view"} elevation={10}>
                    <div className={"paper-inner"} style={styles.paperInner}>
                  <span>
                      <Typography color={"primary"} variant={"h4"}>
                          Courses
                      </Typography>

                      <Button style={styles.button} variant={"contained"} color={"primary"} onClick={handleCourseAddOpen}>
                          <span style={styles.addButtonInner}><AddIcon/> Add Course</span>
                      </Button>
                  </span>


                        <AdminCourseTable addRenderCount={courseRerenderCount}/>
                        <Modal
                            className={"admin-course-add-modal"}
                            open={courseAddOpen}
                            onClose={handleCourseAddClose}
                        >
                            <AdminCourseAddModal onChange={() => {handleCourseAddUpdate()}}/>
                        </Modal>
                    </div>
                </Paper>
            </div>

        </div>
    );
};

export default AdminConsole;
