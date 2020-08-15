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

const styles = {
    addButtonInner: {
        display: "flex", justifyContent: "center", alignItems: "center"
    },
    button: {
        marginRight: "auto", marginLeft: "auto", display: "block", marginBottom: 0.5 + "em"
    },
    paper: {
        padding: 1 + "em"
    },
    paperInner: {
        display: "block"
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

    return (
      <div className="AdminConsole">
          <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
              ADMIN PANEL
          </Typography>

          <Paper style={styles.paper} className={"contributor-view"} elevation={10}>
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

          <Paper style={styles.paper} className={"technology-tag-view"} elevation={10}>
              <div className={"paper-inner"} style={styles.paperInner}>
                  <span>
                      <Typography color={"primary"} variant={"h4"}>
                          Technology Tags
                      </Typography>

                      <Button style={styles.button} variant={"contained"} color={"primary"} onClick={handleTechnologyTagAddOpen}>
                          <span style={styles.addButtonInner}><AddIcon/> Add Technology Tag</span>
                      </Button>
                  </span>


                  <AdminTechnologyTagTable addRenderCount={technologyTagRerenderCount}/>
                  <Modal
                      className={"admin-technology-tag-add-modal"}
                      open={technologyTagAddOpen}
                      onClose={handleTechnologyTagAddClose}
                  >
                      <AdminTechnologyTagAddModal onChange={() => {handleTechnologyTagAddUpdate()}}/>
                  </Modal>
              </div>
          </Paper>
      </div>
  );
};

export default AdminConsole;
