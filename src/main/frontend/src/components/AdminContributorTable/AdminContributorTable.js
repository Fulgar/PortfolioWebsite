import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './AdminContributorTable.css';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import {ArrowDownward, ArrowUpward} from "@material-ui/icons";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

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

const AdminContributorTable = () => {
    // Contains corresponding labels and properties for Table head
    const [header, setHeader] = useState([
        {
            name: "First Name",
            prop: "firstName"
        },
        {
            name: "Last Name",
            prop: "lastName"
        },
        {
            name: "Github Profile",
            prop: "githubProfileLink"
        }
    ]);

    // Contains table body data
    const [bodyData, setBodyData] = useState([]);

    // Container for all Project database rows
    const [contributorData, setContributorData] = useState([]);

    // HTTP Request status
    const [error, setError] = useState(null);
    const [isContributorLoaded, setIsContributorLoaded] = useState(false);

    // Is executed only on first render of component
    useEffect(() => {
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
                    setError(error);
                }
            );
    }, []);



    // If HTTP or internal server error occurs
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    // If any of the database data sets are not finished loading then keep displaying "Loading" indicator
    else if (!isContributorLoaded) {
        return <div>Loading...</div>;
    }
    else {
        // If bodyData has already been set, then this execution is a rerender and should not not be re-executed
        if (bodyData.length === 0) {
            let newBodyData = [];
            for (let i = 0; i < contributorData.length; i++) {
                // Set various table contributor fields
                const contributorDataObj = contributorData[i];
                let firstName = contributorDataObj["firstName"];
                let lastName = contributorDataObj["lastName"];
                let githubProfile = contributorDataObj["githubProfileLink"];

                // Push table body data to temp container
                newBodyData.push({
                    firstName: firstName,
                    lastName: lastName,
                    githubProfileLink: githubProfile
                });
            }



            // Sets the state field of bodyData to new data
            setBodyData(newBodyData);
        }

        return (
            <div className="AdminContributorTable">
                <TableContainer>
                    <Table style={styles.table}>
                        <TableHead style={styles.tableHead}>
                            <TableRow component={Paper} elevation={15}>
                                {
                                    header.map((head, i) => {
                                        return <TableCell style={styles.tableHeadCell} key={`th-${i}`}>
                                            <div style={styles.tableHeadCellInner}>
                                                <span>{head.name}</span>
                                            </div>
                                        </TableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                bodyData.map((body, i) => {
                                    // Only return body row if there are no current filter rules against it
                                    return (
                                        <TableRow component={Paper} elevation={15} key={`tr-${i}`}>
                                            <TableCell style={styles.tableBodyCell}>{body.firstName}</TableCell>
                                            <TableCell style={styles.tableBodyCell}>{body.lastName}</TableCell>
                                            <TableCell style={styles.tableBodyCell}>{body.githubProfileLink}</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

};

export default AdminContributorTable;
