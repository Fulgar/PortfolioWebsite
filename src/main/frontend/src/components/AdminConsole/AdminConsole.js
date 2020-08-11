import React, {useEffect, useState} from 'react';
import './AdminConsole.css';
import Typography from "@material-ui/core/Typography";

const AdminConsole = (props) => {

  return (
      <div className="AdminConsole">
        <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
          ADMIN PANEL
        </Typography>

      </div>
  );
};

export default AdminConsole;
