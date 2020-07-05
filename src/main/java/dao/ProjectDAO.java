package dao;

import dto.ProjectDTO;
import rowmap.ProjectMapper;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProjectDAO
{
	// Retrieves all projects from database
	public List<ProjectDTO> getAllProjects() throws SQLException
	{
		// List of all projects in DTO form
		List<ProjectDTO> allProjects = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		ProjectMapper mapper = new ProjectMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			ProjectDTO newProject = mapper.rowMap(rs);
			allProjects.add(newProject);
		}

		return allProjects;
	}

	// Retrieves Project via ID in DTO form
	public ProjectDTO getProjectByID(int ID) throws SQLException
	{
		// Result
		ProjectDTO project = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS WHERE ID=" + ID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		ProjectMapper mapper = new ProjectMapper();

		project = mapper.rowMap(rs);

		return project;
	}

	// Inserts project into database table
	public ProjectDTO createProject (ProjectDTO project) throws SQLException
	{

		// SQL Query statement
		String QUERY = "INSERT INTO PROJECTS VALUES (";
		QUERY += project.getProjectID();
		QUERY += project.getTitle();
		QUERY += project.getDescription();
		QUERY += project.getGithubLink();
		QUERY += project.getProjectTypeID() + ")";

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		return project;
	}

	// Updates all fields (regardless of change) using ID
	public ProjectDTO updateProject (ProjectDTO project) throws SQLException
	{
		// SQL Query statement
		String QUERY = "UPDATE PROJECTS SET ";
		QUERY += "Title='" + project.getTitle() + "', ";
		QUERY += "ProjectDescription='" + project.getDescription() + "', ";
		QUERY += "GithubLink='" + project.getGithubLink() + "', ";
		QUERY += "ProjectTypeID='" + project.getProjectTypeID() + "', ";
		QUERY += "WHERE ID=" + project.getProjectID();

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		return project;
	}

	// Deletes project
	public void deleteProject (ProjectDTO project) throws SQLException
	{
		// SQL Query statement
		String QUERY = "DELETE FROM PROJECTS WHERE ID=" + project.getProjectID();

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);
	}
}
