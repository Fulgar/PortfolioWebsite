import React from 'react';
import PropTypes from 'prop-types';
import './Projects.css';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const Projects = () => (
  <div className="Projects">
      <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
          PROJECTS
      </Typography>

      <Paper className={ "about-paper"} style={{
          borderColor: "#CCA43B", borderWidth: 0.40 + "em", padding: 5 + "em"}}
             variant={"outlined"}>
          <TableContainer>
              <Table>
                  <TableHead>
                      <TableCell>Head1</TableCell>
                      <TableCell>Head2</TableCell>
                      <TableCell>Head3</TableCell>
                  </TableHead>
                  <TableRow>
                      <TableCell>Hello</TableCell>
                      <TableCell>There</TableCell>
                      <TableCell>World</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>How</TableCell>
                      <TableCell>Are</TableCell>
                      <TableCell>You</TableCell>
                  </TableRow>
              </Table>
          </TableContainer>
      </Paper>
  </div>
);

Projects.propTypes = {};

Projects.defaultProps = {};

export default Projects;
