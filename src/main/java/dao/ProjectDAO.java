package dao;

import dto.ProjectDTO;
import rowmap.ProjectMapper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProjectDAO
{
	// Retrieves all projects from database
	public List<ProjectDTO> getAllProjects() throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// List of all projects in DTO form
		List<ProjectDTO> allProjects = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		ProjectMapper mapper = new ProjectMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			ProjectDTO newProject = mapper.rowMap(rs);
			allProjects.add(newProject);
		}

		dbConnection.close();

		return allProjects;
	}

	// Retrieves Project via ID in DTO form
	public ProjectDTO getProjectByID(int ID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// Result
		ProjectDTO project = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS WHERE ID=" + ID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		ProjectMapper mapper = new ProjectMapper();

		project = mapper.rowMap(rs);

		dbConnection.close();

		return project;
	}

	// Inserts project into database table
	public ProjectDTO createProject (ProjectDTO project) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "INSERT INTO PROJECTS (Title, ProjectDescription, GithubLink, ProjectTypeID, CourseID) VALUES (";
		QUERY += "'" + project.getTitle() + "', ";
		QUERY += "'" + project.getDescription() + "', ";
		QUERY += "'" + project.getGithubLink() + "', ";
		QUERY += project.getProjectTypeID() + ", ";
		QUERY += project.getCourseID() + ")";

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return project;
	}

	// Updates all fields (regardless of change) using ID
	public ProjectDTO updateProject (ProjectDTO project) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "UPDATE PROJECTS SET ";
		QUERY += "Title='" + project.getTitle() + "', ";
		QUERY += "ProjectDescription='" + project.getDescription() + "', ";
		QUERY += "GithubLink='" + project.getGithubLink() + "', ";
		QUERY += "ProjectTypeID=" + project.getProjectTypeID() + ", ";
		QUERY += "CourseID=" + project.getProjectTypeID() + " ";
		QUERY += "WHERE ID=" + project.getProjectID();

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return project;
	}

	// Deletes project from database
	public void deleteProject (ProjectDTO project) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "DELETE FROM PROJECTS WHERE ID=" + project.getProjectID();

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();
	}
}
