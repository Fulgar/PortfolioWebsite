import React, {useEffect, useState} from 'react';
import './AdminConsole.css';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AdminContributorTable from "../AdminContributorTable/AdminContributorTable";
import Modal from "@material-ui/core/Modal";
import AdminContributorAddModal from "../AdminContributorTable/AdminContributorAddModal/AdminContributorAddModal";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';

const styles = {
    addButtonInner: {
        display: "flex", justifyContent: "center", alignItems: "center"
    }
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

    return (
      <div className="AdminConsole">
          <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
              ADMIN PANEL
          </Typography>

          <Paper className={"contributor-view"} elevation={10}>
              <Button variant={"contained"} color={"primary"} onClick={handleContributorAddOpen}>
                  <span style={styles.addButtonInner}><AddIcon/> Add Contributor</span>
              </Button>
              <AdminContributorTable renderCount={contributorRerenderCount}/>
              <Modal
                  className={"admin-contributor-add-modal"}
                  open={contributorAddOpen}
                  onClose={handleContributorAddClose}
              >
                  <AdminContributorAddModal onChange={() => {handleContributorAddUpdate()}}/>
              </Modal>
          </Paper>
      </div>
  );
};

export default AdminConsole;
