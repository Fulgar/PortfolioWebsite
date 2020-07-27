package dao;

import dto.ProjectTypeDTO;
import dto.ProjectTypeDTO;
import rowmap.ProjectTypeMapper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProjectTypeDAO
{
	// Retrieves all project types from database
	public List<ProjectTypeDTO> getAllProjectTypes() throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// List of all projects in DTO form
		List<ProjectTypeDTO> allProjectTypes = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECT_TYPES";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		ProjectTypeMapper mapper = new ProjectTypeMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			ProjectTypeDTO newProjectType = mapper.rowMap(rs);
			allProjectTypes.add(newProjectType);
		}

		dbConnection.close();

		return allProjectTypes;
	}

	// Retrieves Project Type via ProjectTypeID in DTO form
	public ProjectTypeDTO getProjectTypeByID(int ID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// Result
		ProjectTypeDTO projectType = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECT_TYPES WHERE ID=" + ID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		ProjectTypeMapper mapper = new ProjectTypeMapper();

		rs.first();
		projectType = mapper.rowMap(rs);

		dbConnection.close();

		return projectType;
	}

	// Retrieves Project Type via ProjectID in DTO
	public ProjectTypeDTO getProjectTypeByProjectID(int ProjectID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// Result
		ProjectTypeDTO projectType = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECT_TYPES WHERE PROJECT_TYPES.ID=(SELECT ProjectTypeID FROM PROJECTS WHERE PROJECTS.ID=" + ProjectID + ")";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		ProjectTypeMapper mapper = new ProjectTypeMapper();

		rs.first();
		projectType = mapper.rowMap(rs);

		dbConnection.close();

		return projectType;
	}

	// Inserts projectType into database table
	public ProjectTypeDTO createProjectType (ProjectTypeDTO projectType) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "INSERT INTO PROJECT_TYPES (TypeName) VALUES (";
		QUERY += "'" + projectType.getName() + "')";

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return projectType;
	}

	// Updates all fields (regardless of change) using ID
	public ProjectTypeDTO updateProjectType (ProjectTypeDTO projectType) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "UPDATE PROJECT_TYPES SET ";
		QUERY += "TypeName='" + projectType.getName() + "' ";
		QUERY += "WHERE ID=" + projectType.getProjectTypeID();

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return projectType;
	}

	// Deletes projectType
	public void deleteProjectType (int projectTypeID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "DELETE FROM PROJECT_TYPES WHERE ID=" + projectTypeID;

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();
	}
}
