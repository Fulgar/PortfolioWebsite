import React, {useEffect, useState} from 'react';
import './AdminProjectEditModal.css';
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
import AddIcon from "@material-ui/icons/Add";
import AdminProjectTable from "../AdminProjectTable";
import Modal from "@material-ui/core/Modal";
import AdminDemoMediaTable from "../AdminDemoMediaTable/AdminDemoMediaTable";
import AdminDemoMediaAddModal from "../AdminDemoMediaTable/AdminDemoMediaAddModal/AdminDemoMediaAddModal";

const styles = {
    modalStyle: {
        width: 800,
        height: 800,
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
    },
    addButtonInner: {
        display: "flex", justifyContent: "center", alignItems: "center"
    },
    button: {
        marginRight: "auto", marginLeft: "auto", display: "block", marginBottom: 0.5 + "em"
    },
    paper: {
        padding: 1 + "em", minWidth: 700
    },
    paperInner: {
        display: "block"
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

const AdminProjectEditModal = (props) => {
    // Form data
    const [newProjectTitle, setNewProjectTitle] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");
    const [newProjectGithub, setNewProjectGithub] = useState("");
    const [newProjectType, setNewProjectType] = useState("");
    const [newCourse, setNewCourse] = useState("");
    const [newContributors, setNewContributors] = useState([]);
    const [newTechnologyTags, setNewTechnologyTags] = useState([]);
    const [newDemoMedia, setNewDemoMedia] = useState([]);

    // TODO: Not needed in PE
    // Used to store each newly submitted DemoMedia upon submission of DemoMediaAdd
    const [addDemoMediaData, setAddDemoMediaData] = useState({});

    // Container for all ProjectType database rows
    const [allProjectTypeData, setAllProjectTypeData] = useState([]);

    // Container for all Course database rows
    const [allCourseData, setAllCourseData] = useState([]);

    // Container for all TechnologyTag database rows
    const [allTechnologyTagData, setAllTechnologyTagData] = useState([]);

    // Container for all Contributor database rows
    const [allContributorData, setAllContributorData] = useState([]);

    // HTTP Request status
    const [isAllProjectTypesLoaded, setIsAllProjectTypesLoaded] = useState(false);
    const [isAllCoursesLoaded, setIsAllCoursesLoaded] = useState(false);
    const [isAllTechnologyTagsLoaded, setIsAllTechnologyTagsLoaded] = useState(false);
    const [isAllContributorsLoaded, setIsAllContributorsLoaded] = useState(false);
    const [isCurrentProjectDataLoaded, setIsCurrentProjectDataLoaded] = useState(false);
    const [isCurrentContributorDataLoaded, setIsCurrentContributorDataLoaded] = useState(false);
    const [isCurrentTechnologyTagDataLoaded, setIsCurrentTechnologyTagDataLoaded] = useState(false);

    // Submission status
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Fetch all ProjectType database data via GET request
        fetch("/portfolio/projectType/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setAllProjectTypeData(result);
                    setIsAllProjectTypesLoaded(true);
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
                    setAllCourseData(result);
                    setIsAllCoursesLoaded(true);
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
                    setAllTechnologyTagData(result);
                    setIsAllTechnologyTagsLoaded(true);
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
                    setAllContributorData(result);
                    setIsAllContributorsLoaded(true);
                },
                (error) => {
                    console.error(error);
                }
            );
    }, []);

    // Fires on first render and once all projectTypes and courses are loaded in
    useEffect(() => {
        if (isAllProjectTypesLoaded && isAllCoursesLoaded) {
            // Fetches all Project table data for currently selected Project
            fetch("/portfolio/project/" + props.projectID)
                .then(res => res.json())
                .then(
                    (result) => {
                        setNewProjectTitle(result["title"]);
                        setNewProjectDescription(result["description"]);
                        setNewProjectGithub(result["githubLink"]);

                        let projectTypeID = result["projectTypeID"];
                        allProjectTypeData.map((projectType) => {
                            if (projectType["projectTypeID"] === projectTypeID) {
                                setNewProjectType(projectType);
                            }
                        });

                        let courseID = result["courseID"];
                        allCourseData.map((course) => {
                            if (course["courseID"] === courseID) {
                                setNewCourse(course);
                            }
                        });

                        setIsCurrentProjectDataLoaded(true);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
        }

    }, [isAllProjectTypesLoaded, isAllCoursesLoaded]);

    // Fires on first render and once all contributors are loaded in
    useEffect(() => {
        if (isAllContributorsLoaded) {
            // Fetches all Contributor table data for currently selected Project
            fetch("/portfolio/contributor/byProject/" + props.projectID)
                .then(res => res.json())
                .then(
                    (result) => {
                        let tempContributors = [...newContributors];
                        result.map((contributor) => {
                            tempContributors.push(contributor);
                        });
                        setNewContributors([...tempContributors]);
                        setIsCurrentContributorDataLoaded(true);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
        }

    }, [isAllContributorsLoaded]);

    // Fires on first render and once all techTags are loaded in
    useEffect(() => {
        if (isAllTechnologyTagsLoaded) {
            // Fetches all TechnologyTag table data for currently selected Project
            fetch("/portfolio/technologyTag/byProject/" + props.projectID)
                .then(res => res.json())
                .then(
                    (result) => {
                        let tempTechTags = [...newTechnologyTags];
                        result.map((techTag) => {
                            tempTechTags.push(techTag);
                        });
                        setNewTechnologyTags([...tempTechTags]);
                        setIsCurrentTechnologyTagDataLoaded(true);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
        }

    }, [isAllTechnologyTagsLoaded]);

    // TODO: Not needed in PE
    useEffect(() => {
        if (JSON.stringify(addDemoMediaData) !== "{}") {
            let tempDemoMediaData = [...newDemoMedia];
            tempDemoMediaData.push({...addDemoMediaData});
            setNewDemoMedia([...tempDemoMediaData]);
            setDemoMediaAddOpen(false);
        }
    }, [addDemoMediaData]);

    function handleChange() {
        console.log("DEBUG: handleChange() [AdminProjectEditModal]");
        props.onChange();
    }

    const handleSubmit = async () => {
        const newProjectData = {
            "title": newProjectTitle,
            "description": newProjectDescription,
            "githubLink": newProjectGithub,
            "projectTypeID": newProjectType["projectTypeID"],
            "courseID": newCourse["courseID"]
        };

        // Stores POST response for Project Table insert
        // NOTE: Must use "await projectInsertResult" when accessing after fetch request
        let projectInsertResult = null;

        await fetch("/portfolio/project/create",
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
                body: JSON.stringify(newProjectData)
            }).then((response) => {
            projectInsertResult = response.json();
            // setSubmitted(true);
        });

        let createdProject = await projectInsertResult;
        let projectID = createdProject["projectID"];

        // If newDemoMedia exists
        if (newDemoMedia.length > 0) {
            newDemoMedia.map(async (demo, i) => {
                const newDemoMediaData = {
                    "url": demo["url"],
                    "mediaType": demo["mediaType"],
                    "mediaTitle": demo["mediaTitle"],
                    "mediaCaption": demo["mediaCaption"],
                    "projectID": projectID
                };
                console.log(newDemoMediaData);
                await fetch("/portfolio/demoMedia/create",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newDemoMediaData)
                    });
            });
        }

        // If newContributors exists
        if (newContributors.length > 0) {
            newContributors.map(async (contributor, i) => {
                const newContributorsData = {
                    "contributorID": contributor["contributorID"],
                    "projectID": projectID
                };
                console.log(newContributorsData);
                await fetch("/portfolio/project_contributor/create",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newContributorsData)
                    });
            });
        }
        else {
            console.error("No contributors detected!")
        }

        // If newTechnologyTags exists
        if (newTechnologyTags.length > 0) {
            newTechnologyTags.map(async (technology, i) => {
                const newTechnologyTagsData = {
                    "technologyTagID": technology["technologyID"],
                    "projectID": projectID
                };
                console.log(newTechnologyTagsData);
                await fetch("/portfolio/project_TechnologyTag/create",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newTechnologyTagsData)
                    });
            });
        }
        else {
            console.error("No technology tags detected!")
        }

        setSubmitted(true);
    };

    // DemoMedia Module fields
    // DemoMedia "Add" Modal fields
    const [demoMediaAddOpen, setDemoMediaAddOpen] = useState(false);
    const handleDemoMediaAddOpen = () => {
        setDemoMediaAddOpen(true);
    };
    const handleDemoMediaAddClose = () => {
        setDemoMediaAddOpen(false);
    };
    const handleDemoMediaAddUpdate = () => {
        handleDemoMediaAddClose();
        setDemoMediaRerenderCount(demoMediaRerenderCount + 1);
    };
    const [demoMediaRerenderCount, setDemoMediaRerenderCount] = useState(0);


    // Returns an array of all selected contributors' ID's
    const getSelectedContributorIDs = () => {
        let selectedContributorIDs = [];
        newContributors.map((contributor) => {
            selectedContributorIDs.push(contributor["contributorID"]);
        });
        return selectedContributorIDs;
    };

    // Returns a string that contains the first and last name of a contributor, separated by a space
    const getContributorLabel = (contributorID) => {
        let valObj = allContributorData.find(el => el["contributorID"] === contributorID);
        return valObj.firstName + " " + valObj.lastName;
    };

    // Returns an array of all selected technologyTags' ID's
    const getSelectedTechnologyTagIDs = () => {
        let selectedTechnologyTagIDs = [];
        newTechnologyTags.map((technologyTag) => {
            selectedTechnologyTagIDs.push(technologyTag["technologyID"]);
        });
        return selectedTechnologyTagIDs;
    };

    // Returns a string that contains the name of the technologyTag
    const getTechnologyTagLabel = (technologyTagID) => {
        let valObj = allTechnologyTagData.find(el => el["technologyID"] === technologyTagID);
        return valObj.technologyName;
    };

    if (submitted) {
        handleChange();
    }
    if (!isAllProjectTypesLoaded || !isAllCoursesLoaded || !isAllTechnologyTagsLoaded || !isAllContributorsLoaded
        || !isCurrentProjectDataLoaded || !isCurrentContributorDataLoaded || !isCurrentTechnologyTagDataLoaded) {
        return <Paper>Loading</Paper>
    } else {
        return (
            <Paper style={styles.modalStyle} elevation={10} className="AdminProjectEditModal">
                <div className={"ProjectEditModalInner"}>
                    <Typography color={"primary"} variant={"h4"}>
                        Edit Project
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
                            onChange={(e) => {
                                setNewProjectTitle(e.target.value)
                            }}
                        />

                        <TextField
                            required
                            id={"projectDescriptionInput"}
                            label={"Project Description"}
                            defaultValue={newProjectDescription}
                            variant={"outlined"}
                            style={styles.formContent}
                            onChange={(e) => {
                                setNewProjectDescription(e.target.value)
                            }}
                        />

                        <TextField
                            required
                            id={"projectGithubInput"}
                            label={"Github URL"}
                            helperText={"Must Include https://"}
                            defaultValue={newProjectGithub}
                            variant={"outlined"}
                            style={styles.formContent}
                            onChange={(e) => {
                                setNewProjectGithub(e.target.value)
                            }}
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
                                onChange={(e) => {
                                    setNewProjectType(e.target.value)
                                }}
                            >
                                {allProjectTypeData.map((projectTypeObj) => (
                                    <MenuItem key={projectTypeObj.projectTypeID} value={projectTypeObj}>
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
                                value={getSelectedContributorIDs()}
                                onChange={(e) => {
                                    let tempContributors = [];
                                    e.target.value.map((contributorID) => {
                                        tempContributors.push(allContributorData.find(el => el["contributorID"] === contributorID));
                                    });
                                    setNewContributors([...tempContributors]);
                                }}
                                input={<Input/>}
                                renderValue={(selected) => {
                                    return (
                                        <div style={{display: "inline-flex", flexWrap: "wrap"}}>
                                            {selected.map((value) => (
                                                <Chip color={"secondary"} key={value}
                                                      label={getContributorLabel(value)}
                                                />
                                            ))}
                                        </div>
                                    );
                                }}
                                MenuProps={MenuProps}
                            >
                                {allContributorData.map((contributorObj) => (
                                    <MenuItem key={contributorObj.contributorID} value={contributorObj["contributorID"]}>
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
                                onChange={(e) => {
                                    setNewCourse(e.target.value)
                                }}
                            >
                                <MenuItem value={null}>
                                    N/A
                                </MenuItem>
                                {allCourseData.map((courseObj) => (
                                    <MenuItem key={courseObj.courseID} value={courseObj}>
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
                                value={getSelectedTechnologyTagIDs()}
                                onChange={(e) => {
                                    let tempTechnologyTags = [];
                                    e.target.value.map((technologyTagID) => {
                                        tempTechnologyTags.push(allTechnologyTagData.find(el => el["technologyID"] === technologyTagID));
                                    });
                                    setNewTechnologyTags([...tempTechnologyTags]);
                                }}
                                input={<Input/>}
                                renderValue={(selected) => (

                                    <div style={{display: "inline-flex", flexWrap: "wrap"}}>
                                        {selected.map((value) => (
                                            <Chip color={"secondary"} key={value}
                                                  label={getTechnologyTagLabel(value)}/>
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {allTechnologyTagData.map((technologyTagObj) => (
                                    <MenuItem key={technologyTagObj.technologyID} value={technologyTagObj["technologyID"]}>
                                        <span>{technologyTagObj.technologyName}</span>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Divider style={styles.divider}/>

                        <Paper style={styles.paper} className={"demoMedia-view"} elevation={10}>
                            <div className={"paper-inner"} style={styles.paperInner}>
                                <span>
                                    <Typography color={"primary"} variant={"h4"}>
                                        DemoMedia
                                    </Typography>

                                    <Button style={styles.button} variant={"contained"} color={"primary"}
                                            onClick={handleDemoMediaAddOpen}>
                                        <span style={styles.addButtonInner}><AddIcon/> Add DemoMedia</span>
                                    </Button>
                                </span>

                                <AdminDemoMediaTable mode={"projectEdit"} projectID={props.projectID}
                                                     addRenderCount={demoMediaRerenderCount}
                                />
                                <Modal
                                    className={"admin-demoMedia-add-modal"}
                                    open={demoMediaAddOpen}
                                    onClose={handleDemoMediaAddClose}
                                >
                                    <AdminDemoMediaAddModal
                                        mode={"projectEdit"}
                                        onChange={() => {handleDemoMediaAddUpdate()}}
                                    />
                                </Modal>
                            </div>
                        </Paper>

                        <br/><br/>
                        <Button style={{margin: "1em auto"}} color={"primary"} variant={"contained"} onClick={ async () => {
                            await handleSubmit()
                        }}>
                            Submit
                        </Button>
                    </form>
                </div>

            </Paper>
        );
    }
};


export default AdminProjectEditModal;
