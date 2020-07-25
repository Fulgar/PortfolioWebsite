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

const Projects = () => {
    const [data, setData] = useState([
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

    return (
        <div className="Projects">
            <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
                PROJECTS
            </Typography>

            <Paper className={"about-paper"} style={{
                borderColor: "#CCA43B", borderWidth: 0.40 + "em", padding: 5 + "em"}}
                   variant={"outlined"}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    header.map((head) => {
                                        return <TableCell>{head.name}</TableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((body) => {
                                    return<TableRow>
                                        <TableCell>{body.projectID}</TableCell>
                                        <TableCell>{body.title}</TableCell>
                                        <TableCell>{body.description}</TableCell>
                                        <TableCell>{body.projectTypeID}</TableCell>
                                        <TableCell>{body.courseID}</TableCell>
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
