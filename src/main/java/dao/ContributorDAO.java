package dao;

import dto.ContributorDTO;
import rowmap.ContributorMapper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ContributorDAO
{
	// Retrieves all contributors from database
	public List<ContributorDTO> getAllContributors() throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// List of all contributors in DTO form
		List<ContributorDTO> allContributors = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM CONTRIBUTORS";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		ContributorMapper mapper = new ContributorMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			ContributorDTO newContributor = mapper.rowMap(rs);
			allContributors.add(newContributor);
		}

		dbConnection.close();

		return allContributors;
	}

	// Retrieves Contributor via ID in DTO form
	public ContributorDTO getContributorByID(int ID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// Result
		ContributorDTO contributor = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM CONTRIBUTORS WHERE ID=" + ID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		ContributorMapper mapper = new ContributorMapper();

		rs.first();
		contributor = mapper.rowMap(rs);


		dbConnection.close();

		return contributor;
	}


	// Retrieves Contributors via ProjectID in DTO form
	public List<ContributorDTO> getContributorsByProjectID(int ProjectID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// List of all contributors in DTO form
		List<ContributorDTO> allContributors = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT CONTRIBUTORS.ID, CONTRIBUTORS.FirstName, CONTRIBUTORS.LastName, CONTRIBUTORS.GithubProfileLink " +
				"FROM CONTRIBUTORS " +
				"INNER JOIN PROJECTS_CONTRIBUTORS ON CONTRIBUTORS.ID=PROJECTS_CONTRIBUTORS.ContributorID " +
				"WHERE PROJECTS_CONTRIBUTORS.ProjectID=" + ProjectID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		ContributorMapper mapper = new ContributorMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			ContributorDTO newContributor = mapper.rowMap(rs);
			allContributors.add(newContributor);
		}

		dbConnection.close();

		return allContributors;
	}


	// Inserts contributor into database table
	public ContributorDTO createContributor (ContributorDTO contributor) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "INSERT INTO CONTRIBUTORS (FirstName, LastName, GithubProfileLink) VALUES (";
		QUERY += "'" + contributor.getFirstName() + "', ";
		QUERY += "'" + contributor.getLastName() + "', ";
		QUERY += "'" + contributor.getGithubProfileLink() + "')";

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return contributor;
	}

	// Updates all fields (regardless of change) using ID
	public ContributorDTO updateContributor (ContributorDTO contributor) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "UPDATE CONTRIBUTORS SET ";
		QUERY += "FirstName='" + contributor.getFirstName() + "', ";
		QUERY += "LastName='" + contributor.getLastName() + "', ";
		QUERY += "GithubProfileLink='" + contributor.getGithubProfileLink() + "' ";
		QUERY += "WHERE ID=" + contributor.getContributorID();

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return contributor;
	}

	// Deletes contributor
	public void deleteContributor (int contributorID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "DELETE FROM CONTRIBUTORS WHERE ID=" + contributorID;

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();
	}
}
