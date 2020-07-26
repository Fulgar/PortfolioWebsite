import React, {useEffect, useState} from 'react';
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
    // Container for all Project database rows
    const [projectData, setProjectData] = useState([]);

    // Container for all ProjectType database rows
    const [projectTypeData, setProjectTypeData] = useState([]);

    // Container for all Course database rows
    const [courseData, setCourseData] = useState([]);

    // Container for all TechnologyTag database rows
    const [technologyTagData, setTechnologyTagData] = useState([]);

    // Container for all Project_TechnologyTag database rows
    const [project_technologyTagData, setProject_TechnologyTagData] = useState([]);

    // Contains table body data
    const [bodyData, setBodyData] = useState([]);

    // HTTP Request status
    const [error, setError] = useState(null);
    const [isProjectLoaded, setIsProjectLoaded] = useState(false);
    const [isProjectTypeLoaded, setIsProjectTypeLoaded] = useState(false);
    const [isCourseLoaded, setIsCourseLoaded] = useState(false);
    const [isTechnologyTagLoaded, setIsTechnologyTagLoaded] = useState(false);
    const [isProject_TechnologyTagLoaded, setIsProject_TechnologyTagLoaded] = useState(false);

    // Contains corresponding labels and properties for Table head
    const [header, setHeader] = useState([
        {
            name: "Project Title",
            prop: "projectTitle"
        },
        {
            name: "Type",
            prop: "projectTypeName"
        },
        {
            name: " Course Subject*",
            prop: "subjectName"
        },
        {
            name: "Course*",
            prop: "courseName"
        },
        {
            name: "Technology Tags",
            prop: "technologyTagNames"
        }
    ]);

    // Is executed only on first render of Projects component
    useEffect(() => {
        // Fetch all Project database data via GET request
        fetch("/portfolio/project/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectData(result);
                    setIsProjectLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setError(error);
                }
            );

        // Fetch all ProjectType database data via GET request
        fetch("/portfolio/projectType/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectTypeData(result);
                    setIsProjectTypeLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setError(error);
                }
            );

        // Fetch all Course database data via GET request
        fetch("/portfolio/course/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setCourseData(result);
                    setIsCourseLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setError(error);
                }
            );

        // Fetch all TechnologyTag database data via GET request
        fetch("/portfolio/technologyTag/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setTechnologyTagData(result);
                    setIsTechnologyTagLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setError(error);
                }
            );

        // Fetch all Project_TechnologyTag database data via GET request
        fetch("/portfolio/project_TechnologyTag/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setProject_TechnologyTagData(result);
                    setIsProject_TechnologyTagLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setError(error);
                }
            );

    }, []);

    // If HTTP or internal server error occurs
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    // If any of the database data sets are not finished loading then keep displaying "Loading" indicator
    else if (!isProjectLoaded || !isProjectTypeLoaded || !isCourseLoaded || !isTechnologyTagLoaded || !isProject_TechnologyTagLoaded) {
        return <div>Loading...</div>;
    }
    else {
        // If bodyData has already been set, then this execution is a rerender and should not not be re-executed
        // Without this one condition the program runs into an infinite loop that crashes due to "Too many Re-Renders"
        if (bodyData.length === 0) {
            let newBodyData = [];
            for (let i = 0; i < projectData.length; i++) {
                // Set various table body fields
                const projectDataObj = projectData[i];
                let projectID = projectDataObj["projectID"];
                let projectTitle = projectDataObj["title"];
                let projectTypeID = projectDataObj["projectTypeID"];
                let projectTypeDataObj = projectTypeData.find(element => element["projectTypeID"] === projectTypeID);
                let projectTypeName = projectTypeDataObj["name"];
                let courseID = projectDataObj["courseID"];

                // CourseID and its associations can be null/undefined
                let subjectName = "";
                let courseName = "";
                if (courseID !== undefined) {
                    const courseDataObj = courseData.find(element => element["courseID"] === courseID);
                    subjectName = courseDataObj["subjectName"];
                    courseName = courseDataObj["courseName"];
                }

                // Set technology tag names
                let techTagNames = [];
                for (let j = 0; j < project_technologyTagData.length; j++) {
                    if (project_technologyTagData[j]["projectID"] === projectID) {
                        let techID = project_technologyTagData[j]["technologyTagID"];
                        let techObj = technologyTagData.find(element => element["technologyID"] === techID);
                        let techName = techObj["technologyName"];
                        techTagNames.push(techName);
                    }
                }

                // Push table body data to temp container
                newBodyData.push({
                    projectID: projectID,
                    projectTitle: projectTitle,
                    projectTypeName: projectTypeName,
                    subjectName: subjectName,
                    courseName: courseName,
                    technologyTagNames: techTagNames
                });
            }

            // Sets the state field of bodyData to new data
            setBodyData(newBodyData);
        }

        // Render
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
                                    bodyData.map((body, i) => {
                                        return <TableRow component={ Paper } elevation={15} key={`tr-${i}`}>
                                            <TableCell style={styles.tableCell}><a href={`/projects/${body.projectID}`}>{body.projectTitle}</a></TableCell>
                                            <TableCell style={styles.tableCell}>{body.projectTypeName}</TableCell>
                                            <TableCell style={styles.tableCell}>{body.subjectName}</TableCell>
                                            <TableCell style={styles.tableCell}>{body.courseName}</TableCell>
                                            <TableCell style={styles.tableCell}>{body.technologyTagNames.join(", ")}</TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        );
    }

};

export default Projects;
