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
import orderBy from "lodash/orderBy";
import {ArrowUpward, ArrowDownward} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";


// Styles Object
const styles = {
    tableBodyCell: {
        borderLeftWidth: 1 + "px", borderRightWidth: 1 + "px",
        borderLeftStyle: "solid", borderRightStyle: "solid",
        borderTopWidth: 0 + "px", borderBottomWidth: 0 + "px",
        borderColor: "#242F40"
    },
    tableHeadCell: {
        borderLeftWidth: 1 + "px", borderRightWidth: 1 + "px",
        borderLeftStyle: "solid", borderRightStyle: "solid",
        borderTopWidth: 0 + "px", borderBottomWidth: 0 + "px",
        borderColor: "#242F40"
    },
    tableHeadCellInner: {
        display: "flex", justifyContent: "center", alignItems: "center"
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

    // Controls the anchor element in the filter menu
    const [anchorEl, setAnchorEl] = useState(null);

    // Maps the opposite sort direction to each direction
    const reverseSort = {
        "asc": "desc",
        "desc": "asc"
    };

    // Contains the list of possible filter options for Tech tags
    const [filterList, setFilterList] = useState(["No filter"]);

    // Contains the current index for the filterList
    const [filterIndex, setFilterIndex] = useState(0); // Default will be 0, so first item is "No filter"

    // Function that handles when filter listItem is clicked
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function that handles when filter menuItem is clicked
    const handleMenuItemClick = (event, index) => {
        setFilterIndex(index);
        setAnchorEl(null);
    };

    // Handles the closing of the menu
    const handleClose = () => {
        setAnchorEl(null);
    };

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

    // Contains the revised and order bodyData
    let sortedBodyData = [];

    // Handles sorting
    // Contains current column that is being sorted
    const [selectedColumn, setSelectedColumn] = useState("projectTypeName");

    // Contains sorting direction for selected column, using Lodash library sorting strings as values
    const [sortMode, setSortMode] = useState("asc");

    // Is executed after first render only if isTechnologyTagLoaded is changed
    useEffect(() => {
        if (isTechnologyTagLoaded) {
            let newFilterList = [...filterList];
            technologyTagData.map((techRow, i) => {
                newFilterList.push(techRow["technologyName"])
            });
            setFilterList(newFilterList);
            console.log("Use effect called");
            console.log(filterList);
        }
    }, [isTechnologyTagLoaded]);

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
            sortedBodyData = orderBy(bodyData, selectedColumn, sortMode);
        }
        else {
            sortedBodyData = orderBy(bodyData, selectedColumn, sortMode);
        }



        // Render
        return (
            <div className="Projects">
                <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
                    PROJECTS
                </Typography>

                <Paper className={"projects-paper"} style={{
                    borderColor: "#CCA43B", borderWidth: 0.40 + "em", padding: 5 + "em"}}
                       variant={"outlined"}>
                    <div style={{textAlign: "right", alignItems: "right", float: "right"}}
                         className={"filter-menu-container"}>
                        <List component={"nav"} aria-label={"Filter Settings"}>
                            <ListItem button aria-haspopup={"true"} aria-controls={"filter-menu"}
                                      aria-label={"Filter by tech tags"} onClick={handleClickListItem}
                                      style={{marginLeft: "auto"}}>
                                <ListItemText primary={"Filter By Technology Tags"}
                                              secondary={filterList[filterIndex]}
                                              style={{marginLeft: "auto", textAlign: "right", alignItems: "right",}}/>
                            </ListItem>
                        </List>
                        <Menu id={"filter-menu"} anchorEl={anchorEl} keepMounted
                              open={Boolean(anchorEl)} onClose={handleClose}
                              style={{marginLeft: "auto", textAlign: "right", alignItems: "right"}}>
                            {
                                filterList.map((filterItem, i) => (
                                    <MenuItem key={filterItem} selected={i === filterIndex}
                                              onClick={(event) => handleMenuItemClick(event, i)}>
                                        {filterItem}
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </div>

                    <TableContainer>
                        <Table style={styles.table}>
                            <TableHead style={styles.tableHead}>
                                <TableRow style={{cursor: "pointer"}} component={ Paper } elevation={15}>
                                    {
                                        header.map((head, i) => {
                                            return <TableCell style={styles.tableHeadCell} key={`th-${i}`} onClick={() => {
                                                if (head.prop === selectedColumn) {
                                                    setSortMode(reverseSort[sortMode]);
                                                }
                                                else if (head.prop !== selectedColumn && head.prop !== "technologyTagNames") {
                                                    setSelectedColumn(head.prop);
                                                }
                                            }}>
                                                <div style={styles.tableHeadCellInner}>
                                                    <span>
                                                        {head.name}
                                                    </span>

                                                    {selectedColumn === head.prop ? (sortMode === "asc" ? <ArrowUpward/> : <ArrowDownward/>) : ""}
                                                </div>
                                            </TableCell>
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    sortedBodyData.map((body, i) => {
                                        // Only return body row if there are no current filter rules against it
                                        if (filterIndex === 0 || (filterIndex !== 0 && body.technologyTagNames.includes(filterList[filterIndex])))
                                            return <TableRow component={ Paper } elevation={15} key={`tr-${i}`}>
                                            <TableCell style={styles.tableBodyCell}><a href={`/projects/${body.projectID}`}>{body.projectTitle}</a></TableCell>
                                            <TableCell style={styles.tableBodyCell}>{body.projectTypeName}</TableCell>
                                            <TableCell style={styles.tableBodyCell}>{body.subjectName}</TableCell>
                                            <TableCell style={styles.tableBodyCell}>{body.courseName}</TableCell>
                                            <TableCell style={styles.tableBodyCell}>{body.technologyTagNames.join(", ")}</TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography style={{marginTop: 2 + "em"}} variant={"caption"}>
                        * - Indicates column data only applies to University-type projects
                    </Typography>
                </Paper>
            </div>
        );
    }

};

export default Projects;
