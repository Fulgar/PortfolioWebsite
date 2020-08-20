import React, {useEffect, useState} from 'react';
import './AdminProjectAddModal.css';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

const styles = {
    modalStyle: {
        width: 750,
        height: 750,
        position: "absolute",
        left: 50 + "%",
        top: 50 + "%",
        transform: "translate(-50%, -50%)",
        display: "flex", justifyContent: "center", textAlign: "center",
        overflowY: "auto",
        padding: 7 + "em"
    },
    form: {
        display: "block", alignItems: "center"
    },
    formContent: {
        margin: "2em auto", minWidth: 10 + "em", display: "flex",
    },
    divider: {
        margin: "4em auto", minWidth: 10 + "em", display: "flex",
    }
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const AdminProjectAddModal = (props) => {
    // Form data
    const [newProjectTitle, setNewProjectTitle] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");
    const [newProjectGithub, setNewProjectGithub] = useState("");
    const [newProjectType, setNewProjectType] = useState(null);
    const [newCourse, setNewCourse] = useState(null);
    const [newContributors, setNewContributors] = useState([]);
    const [newTechnologyTags, setNewTechnologyTags] = useState([]);
    const [newDemoMedia, setNewDemoMedia] = useState([]);

    // Container for all ProjectType database rows
    const [projectTypeData, setProjectTypeData] = useState([]);

    // Container for all Course database rows
    const [courseData, setCourseData] = useState([]);

    // Container for all TechnologyTag database rows
    const [technologyTagData, setTechnologyTagData] = useState([]);

    // Container for all Contributor database rows
    const [contributorData, setContributorData] = useState([]);

    // HTTP Request status
    const [isProjectTypeLoaded, setIsProjectTypeLoaded] = useState(false);
    const [isCourseLoaded, setIsCourseLoaded] = useState(false);
    const [isTechnologyTagLoaded, setIsTechnologyTagLoaded] = useState(false);
    const [isContributorLoaded, setIsContributorLoaded] = useState(false);

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
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
                }
            );

        // Fetch all Contributor database data via GET request
        fetch("/portfolio/contributor/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setContributorData(result);
                    setIsContributorLoaded(true);
                },
                (error) => {
                    console.error(error);
                }
            );
    }, []);

    useEffect(() => {console.log(newCourse)});

    function handleChange() {
        props.onChange();
    }

    const handleSubmit = async () => {
        const data = {
            "projectTitle": newProjectTitle,
            "projectTypeName": newProjectType,
            "courseName": newCourse,
            "contributors": newContributors,
            "techTags": newTechnologyTags,
            "demoMedia": newDemoMedia
        };

        const response = await fetch("/portfolio/project/create",
            {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data)
            }).then(setSubmitted(true));
    };

    if (submitted) {
        handleChange();
    }
    if (!isProjectTypeLoaded || !isCourseLoaded || !isTechnologyTagLoaded || !isContributorLoaded) {
        return <Paper>Loading</Paper>
    }
    else {
        return (
            <Paper style={styles.modalStyle} elevation={10} className="AdminProjectAddModal">
                <div className={"ProjectAddModalInner"}>
                    <Typography color={"primary"} variant={"h4"}>
                        Create Project
                    </Typography>
                    <br/><br/><br/><br/>
                    <form style={styles.form} autoComplete={"off"}>
                        <TextField
                            required
                            id={"projectNameInput"}
                            label={"Project Name"}
                            defaultValue={newProjectTitle}
                            variant={"outlined"}
                            style={styles.formContent}
                            onChange={(e) => {setNewProjectTitle(e.target.value)}}
                        />

                        <TextField
                            required
                            id={"projectDescriptionInput"}
                            label={"Project Description"}
                            defaultValue={newProjectDescription}
                            variant={"outlined"}
                            style={styles.formContent}
                            onChange={(e) => {setNewProjectDescription(e.target.value)}}
                        />

                        <TextField
                            required
                            id={"projectGithubInput"}
                            label={"Github URL"}
                            helperText={"Must Include https://"}
                            defaultValue={newProjectGithub}
                            variant={"outlined"}
                            style={styles.formContent}
                            onChange={(e) => {setNewProjectGithub(e.target.value)}}
                        />

                        <Divider style={styles.divider}/>

                        <FormControl variant={"outlined"} style={styles.formContent}>
                            <InputLabel id="projectType-select-label">ProjectTypes</InputLabel>
                            <Select
                                required
                                className={"projectType-select-form"}
                                labelId={"projectType-select-label"}
                                label={"ProjectTypes"}
                                value={newProjectType}
                                onChange={(e) => {setNewProjectType(e.target.value)}}
                            >
                                {projectTypeData.map((projectTypeObj) => (
                                    <MenuItem key={projectTypeObj.projectTypeID} value={projectTypeObj} >
                                        <span>{projectTypeObj.name}</span>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Divider style={styles.divider}/>

                        <FormControl variant={"outlined"} style={styles.formContent}>
                            <InputLabel id="contributor-select-label">Contributors</InputLabel>
                            <Select
                                className={"contributor-select-form"}
                                labelId={"contributor-select-label"}
                                label={"Contributors"}
                                multiple
                                value={newContributors}
                                onChange={(e) => {setNewContributors(e.target.value)}}
                                input={<Input />}
                                renderValue={(selected) => (

                                    <div style={{display: "inline-flex", flexWrap: "wrap"}}>
                                        {selected.map((value) => (
                                            <Chip color={"secondary"} key={value.contributorID} label={value.firstName + " " + value.lastName}/>
                                        ))}
                                    </div>
                                )}
                                MenuProps={ MenuProps }
                            >
                                {contributorData.map((contributorObj) => (
                                    <MenuItem key={contributorObj.contributorID} value={contributorObj} >
                                        <span>{contributorObj.firstName} {contributorObj.lastName}</span>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Divider style={styles.divider}/>

                        <FormControl variant={"outlined"} style={styles.formContent}>
                            <InputLabel id="course-select-label">Courses</InputLabel>
                            <Select
                                className={"course-select-form"}
                                labelId={"course-select-label"}
                                label={"Courses"}
                                value={newCourse}
                                onChange={(e) => {setNewCourse(e.target.value)}}
                            >
                                <MenuItem value={null}>
                                    N/A
                                </MenuItem>
                                {courseData.map((courseObj) => (
                                    <MenuItem key={courseObj.courseID} value={courseObj} >
                                        <span>{courseObj.courseName}</span>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Divider style={styles.divider}/>

                        <FormControl variant={"outlined"} style={styles.formContent}>
                            <InputLabel id="technologyTag-select-label">TechnologyTags</InputLabel>
                            <Select
                                className={"technologyTag-select-form"}
                                labelId={"technologyTag-select-label"}
                                label={"TechnologyTags"}
                                multiple
                                value={newTechnologyTags}
                                onChange={(e) => {setNewTechnologyTags(e.target.value)}}
                                input={<Input />}
                                renderValue={(selected) => (

                                    <div style={{display: "inline-flex", flexWrap: "wrap"}}>
                                        {selected.map((value) => (
                                            <Chip color={"secondary"} key={value.technologyID} label={value.technologyName}/>
                                        ))}
                                    </div>
                                )}
                                MenuProps={ MenuProps }
                            >
                                {technologyTagData.map((technologyTagObj) => (
                                    <MenuItem key={technologyTagObj.technologyID} value={technologyTagObj} >
                                        <span>{technologyTagObj.technologyName}</span>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Divider style={styles.divider}/>
                        
                        <br/><br/>
                        <Button style={{margin: "1em auto"}} color={"primary"} variant={"contained"} onClick={() => {handleSubmit()}}>
                            Submit
                        </Button>
                    </form>
                </div>

            </Paper>
        );
    }
};


export default AdminProjectAddModal;
