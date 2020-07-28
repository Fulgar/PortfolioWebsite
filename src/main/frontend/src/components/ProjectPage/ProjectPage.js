import React, {useEffect, useState} from 'react';

import './ProjectPage.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const ProjectPage = (props) => {
    const projectID = props.projectID;

    // HTTP Request status
    const [projectError, setProjectError] = useState(null);
    const [isProjectLoaded, setIsProjectLoaded] = useState(false);

    // Container for all current Project data
    const [projectData, setProjectData] = useState([]);

    // Is executed only on first render of Projects component
    useEffect(() => {
        // Fetch specific Project database data via GET request
        fetch("/portfolio/project/" + projectID)
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectData(result);
                    setIsProjectLoaded(true);
                },
                (error) => {
                    console.error(error);
                    setProjectError(error);
                }
            );
    }, []);

    return (
        <div className="ProjectPage">
            <Typography style={{padding: 1 + "em"}} color={"secondary"} variant={"h3"}>
                {
                    (isProjectLoaded === true)
                        ? (<span>{projectData["title"]}</span>)
                        : ((projectError) ? (<span>PROJECT NOT FOUND</span>) : (<span>PROJECT DATA LOADING</span>))
                }
            </Typography>

            <Paper className={"about-paper"} style={{
                borderColor: "#CCA43B", borderWidth: 0.40 + "em", padding: 5 + "em"}}
                   variant={"outlined"}>

            </Paper>
        </div>
    );
};
export default ProjectPage;
