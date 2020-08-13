import React, {useEffect, useState} from 'react';
import './AdminConsole.css';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AdminContributorTable from "../AdminContributorTable/AdminContributorTable";

const AdminConsole = (props) => {

  return (
      <div className="AdminConsole">
          <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
              ADMIN PANEL
          </Typography>

          <Paper className={"contributor-view"} elevation={10}>
              <AdminContributorTable/>
          </Paper>
      </div>
  );
};

export default AdminConsole;
