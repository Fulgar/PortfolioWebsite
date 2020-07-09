package dao;

import dto.DemoMediaDTO;
import dto.Project_ContributorDTO;
import rowmap.Project_ContributorMapper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Project_ContributorDAO
{
	// Retrieves all project_Contributors from database
	public List<Project_ContributorDTO> getAllProject_Contributors() throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// List of all project_Contributors in DTO form
		List<Project_ContributorDTO> allProject_Contributors = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS_CONTRIBUTORS";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		Project_ContributorMapper mapper = new Project_ContributorMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			Project_ContributorDTO newProject_Contributor = mapper.rowMap(rs);
			allProject_Contributors.add(newProject_Contributor);
		}

		dbConnection.close();

		return allProject_Contributors;
	}

	// Retrieves list of Project_Contributors via ProjectID in DTO form
	public List<Project_ContributorDTO> getProject_ContributorsByProjectID(int projectID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// Result
		List<Project_ContributorDTO> allProject_Contributors = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS_CONTRIBUTORS WHERE ProjectID=" + projectID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		Project_ContributorMapper mapper = new Project_ContributorMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			Project_ContributorDTO newProject_Contributor = mapper.rowMap(rs);
			allProject_Contributors.add(newProject_Contributor);
		}

		dbConnection.close();

		return allProject_Contributors;
	}

	// Retrieves list of Project_Contributors via ContributorID in DTO form
	public List<Project_ContributorDTO> getProject_ContributorsByContributorID(int contributorID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// Result
		List<Project_ContributorDTO> allProject_Contributors = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS_CONTRIBUTORS WHERE ContributorID=" + contributorID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		Project_ContributorMapper mapper = new Project_ContributorMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			Project_ContributorDTO newProject_Contributor = mapper.rowMap(rs);
			allProject_Contributors.add(newProject_Contributor);
		}

		dbConnection.close();

		return allProject_Contributors;
	}

	// Retrieves Project_Contributor via ProjectID AND ContributorID in DTO form
	public Project_ContributorDTO getProject_ContributorByBothID(int projectID, int contributorID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// Result
		Project_ContributorDTO projectContributorDTO = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS_CONTRIBUTORS WHERE ProjectID=" + projectID + " AND ContributorID=" + contributorID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		Project_ContributorMapper mapper = new Project_ContributorMapper();

		projectContributorDTO = mapper.rowMap(rs);

		dbConnection.close();

		return projectContributorDTO;
	}

	// Inserts project_Contributor into database table
	public Project_ContributorDTO createProject_Contributor (Project_ContributorDTO project_Contributor) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "INSERT INTO PROJECTS_CONTRIBUTORS VALUES (";
		QUERY += project_Contributor.getProjectID() + ", ";
		QUERY += project_Contributor.getContributorID() + ")";

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return project_Contributor;
	}

	// No Update method needed for junction/association table

	// Deletes project_Contributor
	public void deleteProject_Contributor (Project_ContributorDTO project_Contributor) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		int projectID = project_Contributor.getProjectID();
		int contributorID = project_Contributor.getContributorID();

		// SQL Query statement
		String QUERY = "DELETE FROM PROJECTS_CONTRIBUTORS WHERE ProjectID=" + projectID + " AND ContributorID=" + contributorID;

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();
	}
}
