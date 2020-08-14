import React, {useEffect, useState} from 'react';
import './AdminConsole.css';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AdminContributorTable from "../AdminContributorTable/AdminContributorTable";
import Modal from "@material-ui/core/Modal";

const AdminConsole = (props) => {

  return (
      <div className="AdminConsole">
          <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
              ADMIN PANEL
          </Typography>

          <Paper className={"contributor-view"} elevation={10}>
              <AdminContributorTable/>
              <Modal
                  className={"admin-contributor-add-modal"}
                  open={contributorAddOpen}
                  onClose={handleContributorAddClose}
              >

              </Modal>
          </Paper>
      </div>
  );
};

export default AdminConsole;
