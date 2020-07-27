import React, {useEffect, useState} from 'react';

import './ProjectPage.css';

const ProjectPage = (props) => {
    const projectID = props.projectID;

    // HTTP Request status
    const [error, setError] = useState(null);
    const [isProjectLoaded, setIsProjectLoaded] = useState(false);

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
    }, []);

    return (
        <div className="ProjectPage">
            ProjectPage Component
        </div>
    );
};
export default ProjectPage;
