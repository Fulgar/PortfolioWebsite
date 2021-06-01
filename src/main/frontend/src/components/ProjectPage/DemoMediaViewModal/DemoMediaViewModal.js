import React, {useState} from 'react';
import './DemoMediaViewModal.css';
import Typography from "@material-ui/core/Typography";
import {ArrowBack, ArrowForward, Close} from "@material-ui/icons";
// import {Document, Page, pdfjs} from 'react-pdf';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';


const DemoMediaViewModal = (props) => {

	const styles = {
		modalButton: {
			width: 2 + "em",
			height: 2 + "em"
		}
	};

	// Contains the index of the currently viewed demoMedia file
	const [demoMediaIndex, setDemoMediaIndex] = useState(0);

	// Contains the total number of pages of the currently loaded PDF (If loaded)
	const [numPages, setNumPages] = useState(null);


	// Method for returning DemoMedia of IMG type
	const getDemoImage = (url, altText) => {
		return (<img className={"demo-media-content"} src={url} alt={altText}/>
		);
	};

	// Method for returning DemoMedia of VID type
	const getDemoVideo = (url) => {
		return (<video className={"demo-media-content"} controls={true}>
				<source src={url} type={"video/mp4"}/>
			</video>
		);
	};

	// Method for returning DemoMedia of TXT type
	// TODO: Need to read data from TXT files and display that data, instead of iframe
	const getDemoText = (url) => {
		return (<p className={"demo-text-p"}>
				<iframe className={"demo-media-content"} src={url} style={{
					frameBorder: 0,
					minHeight: 50 + "vh"
				}}>
					Browser not compatible
				</iframe>
			</p>
		);
	};

	const onPDFLoad = ({numPages}) => {
		setNumPages(numPages);
	};

	// Method for returning DemoMedia of PDF type
	const getDemoPDF = (url) => {
		console.log(url);
		return (
			<div className={"demo-media-content"} style={{overflowY: "scroll"}}>
				<Document file={url} onLoadError={console.error} onLoadSuccess={onPDFLoad}>
					{
						Array.apply(null, Array(numPages)).map((x, i)=>i+1).map(page => <Page pageNumber={page}/>)
					}
				</Document>
			</div>
		);
		// return (<iframe className={"demo-media-content"} src={url} style={{
		// 		frameBorder: 0,
		// 		minWidth: 100 + "%", minHeight: 80 + "vh"
		// 	}}>
		// 		Browser not compatible
		// 	</iframe>
		// );
	};

	// Method for returning appropriate DemoMedia content
	const getDemoContent = () => {
		if (props.demoMediaData[demoMediaIndex] !== undefined) {
			const demoRow = props.demoMediaData[demoMediaIndex];
			const mediaType = demoRow["mediaType"];
			const mediaTitle = demoRow["mediaTitle"];
			const mediaURL = demoRow["url"];

			switch (mediaType) {
				case "IMG":
					return getDemoImage(mediaURL, mediaTitle);
				case "VID":
					return getDemoVideo(mediaURL);
				case "TXT":
					return getDemoText(mediaURL);
				case "PDF":
					return getDemoPDF(mediaURL);
				default:
					return (<Typography variant={"body1"}>Demo Media does not exist</Typography>);
			}
		}
	};

	// Method that determines if there is a previous demoMedia
	const doesLeftMediaExist = () => {
		if (props.demoMediaData[demoMediaIndex] !== undefined) {
			return props.demoMediaData[demoMediaIndex - 1] !== undefined;
		}
	};

	// Method that determines if there is a next demoMedia
	const doesRightMediaExist = () => {
		if (props.demoMediaData[demoMediaIndex] !== undefined) {
			return props.demoMediaData[demoMediaIndex + 1] !== undefined;
		}
	};

	// Determines mouse cursor over Left button
	const getLeftButtonClasses = () => {
		let result = "left-arrow ";
		if (doesLeftMediaExist()) {
			result += "arrow-more-content";
		} else {
			result += "arrow-no-content";
		}
		return result;
	};

	// Determines mouse cursor over Right button
	const getRightButtonClasses = () => {
		let result = "right-arrow ";
		if (doesRightMediaExist()) {
			result += "arrow-more-content";
		} else {
			result += "arrow-no-content";
		}
		return result;
	};

	// Method that handles the onClick of the Left DemoMedia navigation button
	const handleLeftButton = () => {
		if (doesLeftMediaExist()) {
			setDemoMediaIndex(demoMediaIndex - 1);
		}
	};

	// Method that handles the onClick of the Right DemoMedia navigation button
	const handleRightButton = () => {
		if (doesRightMediaExist()) {
			setDemoMediaIndex(demoMediaIndex + 1);
		}
	};

	return (
		<div className="DemoMediaViewModal">
			<div className={"media-title"}>
				<Typography variant={"h3"}
				            color={"secondary"}>{props.demoMediaData[demoMediaIndex].mediaTitle}</Typography>
			</div>
			{
				getDemoContent()
			}
			<div className={"media-description"}>
				<Typography variant={"body1"}
				            color={"secondary"}>{props.demoMediaData[demoMediaIndex].mediaCaption}</Typography>
			</div>

			<Close className={"close-modal-button"} style={styles.modalButton} color={"secondary"}
			       onClick={props.handleDemoMediaViewClose}/>
			<ArrowBack className={getLeftButtonClasses()} style={styles.modalButton} color={"secondary"}
			           onClick={handleLeftButton}/>
			<ArrowForward className={getRightButtonClasses()} style={styles.modalButton} color={"secondary"}
			              onClick={handleRightButton}/>
		</div>
	)
};

export default DemoMediaViewModal;
