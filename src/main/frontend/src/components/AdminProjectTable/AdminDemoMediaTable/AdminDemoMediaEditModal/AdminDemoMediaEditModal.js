import React, {useEffect, useState} from 'react';
import './AdminDemoMediaEditModal.css';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const styles = {
	modalStyle: {
		width: 750,
		height: 750,
		position: "absolute",
		left: 50 + "%",
		top: 50 + "%",
		transform: "translate(-50%, -50%)",
		display: "flex", justifyContent: "center", textAlign: "center",
		padding: 7 + "em"
	},
	form: {
		display: "block", alignItems: "center"
	},
	formContent: {
		margin: "2em auto", minWidth: 10 + "em", display: "flex",
	}
};

const AdminDemoMediaEditModal = (props) => {
	// Form data
	const [newDemoMediaID] = useState(props.mode === "projectAdd" ? "" : props.demoMediaID);
	const [newDemoMediaTitle, setNewDemoMediaTitle] = useState(props.mode === "projectAdd" ? props.selectedDemoDataObj["mediaTitle"] : "");
	const [newDemoMediaCaption, setNewDemoMediaCaption] = useState(props.mode === "projectAdd" ? props.selectedDemoDataObj["mediaCaption"] : "");
	const [newDemoMediaType, setNewDemoMediaType] = useState(props.mode === "projectAdd" ? props.selectedDemoDataObj["mediaType"] : "");
	const [newDemoMediaURL, setNewDemoMediaURL] = useState(props.mode === "projectAdd" ? props.selectedDemoDataObj["url"] : "");
	const [newDemoMediaProjectID] = useState(props.mode === "projectAdd" ? "" : props.projectID);

	// Array of all accepted types of demoMedia
	const demoMediaTypeData = [
		"IMG",
		"VID",
		"TXT",
		"PDF"
	];

	// Submission status
	const [submitted, setSubmitted] = useState(false);

	const [isDataLoaded, setIsDataLoaded] = useState(false);

	function handleChange(demoMediaData) {
		props.onChange(demoMediaData);
	}

	const handleSubmit = async () => {
		const data = {
			"demoMediaID": newDemoMediaID,
			"mediaTitle": newDemoMediaTitle,
			"mediaCaption": newDemoMediaCaption,
			"mediaType": newDemoMediaType,
			"url": newDemoMediaURL,
			"projectID": newDemoMediaProjectID
		};

		if (props.mode === "projectAdd") {
			handleChange(data);
		}
		if (props.mode === "projectEdit") {
			await fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/demoMedia/update",
				{
					method: "PUT",
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
		}
	};

	// Is called only on the first render
	useEffect(() => {
		if (props.mode === "projectAdd") {
			setIsDataLoaded(true);
		}
		if (props.mode === "projectEdit") {
			// Fetch all DemoMedia database data via GET request
			fetch(process.env.REACT_APP_API_BASE_URL + "/portfolio/demoMedia/" + newDemoMediaID)
				.then(res => res.json())
				.then(
					(result) => {
						setNewDemoMediaTitle(result["mediaTitle"]);
						setNewDemoMediaCaption(result["mediaCaption"]);
						setNewDemoMediaType(result["mediaType"]);
						setNewDemoMediaURL(result["url"]);
						setIsDataLoaded(true);
					},
					(error) => {
						console.error(error);
					}
				);
		}
	}, []);

	if (submitted) {
		handleChange();
	}
	if (isDataLoaded) {
		return (
			<Paper style={styles.modalStyle} elevation={10} className="AdminDemoMediaEditModal">
				<div className={"DemoMediaEditModalInner"}>
					<Typography color={"primary"} variant={"h4"}>
						Edit DemoMedia
					</Typography>
					<br/><br/><br/><br/>
					<form style={styles.form} autoComplete={"off"}>
						<TextField
							required
							id={"demoMediaTitleInput"}
							label={"DemoMedia Title"}
							defaultValue={newDemoMediaTitle}
							variant={"outlined"}
							style={styles.formContent}
							onChange={(e) => {setNewDemoMediaTitle(e.target.value)}}
						/>

						<TextField
							required
							id={"demoMediaCaptionInput"}
							label={"Caption"}
							defaultValue={newDemoMediaCaption}
							variant={"outlined"}
							style={styles.formContent}
							onChange={(e) => {setNewDemoMediaCaption(e.target.value)}}
						/>

						<FormControl variant={"outlined"} style={styles.formContent}>
							<InputLabel id="demoMediaType-select-label">Media Type</InputLabel>
							<Select
								required
								className={"demoMediaType-select-form"}
								labelId={"demoMediaType-select-label"}
								label={"Media Type"}
								value={newDemoMediaType}
								onChange={(e) => {
									setNewDemoMediaType(e.target.value)
								}}
							>
								{demoMediaTypeData.map((demoMediaTypeStr, i) => (
									<MenuItem key={i} value={demoMediaTypeStr}>
										<span>{demoMediaTypeStr}</span>
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							required
							id={"demoMediaURLInput"}
							label={"URL"}
							defaultValue={newDemoMediaURL}
							variant={"outlined"}
							style={styles.formContent}
							onChange={(e) => {setNewDemoMediaURL(e.target.value)}}
						/>

						<br/><br/>
						<Button color={"primary"} variant={"contained"} onClick={async () => { await handleSubmit()}}>
							Submit
						</Button>
					</form>
				</div>

			</Paper>
		);
	}
	else {
		return (
			<div>
				Loading...
			</div>
		);
	}
};


export default AdminDemoMediaEditModal;
