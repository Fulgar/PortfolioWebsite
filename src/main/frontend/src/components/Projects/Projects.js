import React, { useState } from 'react';
import './Projects.css';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

// Styles Object
const styles = {
    tableCell: {
        borderLeftWidth: 1 + "px", borderRightWidth: 1 + "px",
        borderLeftStyle: "solid", borderRightStyle: "solid",
        borderTopWidth: 0 + "px", borderBottomWidth: 0 + "px",
        borderColor: "#242F40"
    },
    tableHead: {
        borderBottomWidth: 1 + "px", borderBottomStyle: "solid", borderColor: "#242F40"
    },
    table: {
        borderWidth: 1 + "px", borderBottomWidth: 2 + "px", borderRightWidth: 2 + "px",
        borderColor: "#242F40", borderStyle: "solid"
    }
};




const Projects = () => {
    // Data state
    // Currently holding temp data
    // Will contain and call HTTP request method
    const [data] = useState([
        {
            "projectID": 1,
            "title" : "Project A",
            "description": "A university project",
            "projectTypeID": 1,
            "courseID": 1
        },
        {
            "projectID": 2,
            "title" : "Project B",
            "description": "A personal project",
            "projectTypeID": 2,
            "courseID": null
        },
        {
            "projectID": 3,
            "title" : "Project C",
            "description": "Another university project",
            "projectTypeID": 1,
            "courseID": 1
        },
        {
            "projectID": 4,
            "title" : "Project D",
            "description": "Another personal project",
            "projectTypeID": 2,
            "courseID": null
        }
    ]);

    const [header, setHeader] = useState([
        {
            name: "Project ID",
            prop: "projectID"
        },
        {
            name: "Title",
            prop: "title"
        },
        {
            name: "Description",
            prop: "description"
        },
        {
            name: "Project Type ID",
            prop: "projectTypeID"
        },
        {
            name: "Course ID",
            prop: "courseID"
        }
    ]);

    const [itemKey, setItemKey] = useState(0);

    return (
        <div className="Projects">
            <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
                PROJECTS
            </Typography>

            <Paper className={"about-paper"} style={{
                borderColor: "#CCA43B", borderWidth: 0.40 + "em", padding: 5 + "em"}}
                   variant={"outlined"}>
                <TableContainer>
                    <Table style={styles.table}>
                        <TableHead style={styles.tableHead}>
                            <TableRow component={ Paper } elevation={15}>
                                {
                                    header.map((head, i) => {
                                        return <TableCell style={styles.tableCell} key={`th-${i}`}>{head.name}</TableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((body, i) => {
                                    return<TableRow component={ Paper } elevation={15} key={`tr-${i}`}>
                                        <TableCell style={styles.tableCell}>{body.projectID}</TableCell>
                                        <TableCell style={styles.tableCell}>{body.title}</TableCell>
                                        <TableCell style={styles.tableCell}>{body.description}</TableCell>
                                        <TableCell style={styles.tableCell}>{body.projectTypeID}</TableCell>
                                        <TableCell style={styles.tableCell}>{body.courseID}</TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default Projects;
