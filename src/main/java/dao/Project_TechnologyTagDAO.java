package dao;

import dto.Project_ContributorDTO;
import dto.Project_TechnologyTagDTO;
import rowmap.Project_TechnologyTagMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Project_TechnologyTagDAO
{
	// Retrieves all project_TechnologyTags from database
	public List<Project_TechnologyTagDTO> getAllProject_TechnologyTags() throws SQLException
	{
		// List of all project_TechnologyTags in DTO form
		List<Project_TechnologyTagDTO> allProject_TechnologyTags = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS_TECHNOLOGY_TAGS";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		Project_TechnologyTagMapper mapper = new Project_TechnologyTagMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			Project_TechnologyTagDTO newProject_TechnologyTag = mapper.rowMap(rs);
			allProject_TechnologyTags.add(newProject_TechnologyTag);
		}

		return allProject_TechnologyTags;
	}

	// Retrieves list of Project_TechnologyTags via ProjectID in DTO form
	public List<Project_TechnologyTagDTO> getProject_TechnologyTagsByProjectID(int projectID) throws SQLException
	{
		// Result
		List<Project_TechnologyTagDTO> allProject_TechnologyTags = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS_TECHNOLOGY_TAGS WHERE ProjectID=" + projectID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		Project_TechnologyTagMapper mapper = new Project_TechnologyTagMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			Project_TechnologyTagDTO newProject_TechnologyTag = mapper.rowMap(rs);
			allProject_TechnologyTags.add(newProject_TechnologyTag);
		}

		return allProject_TechnologyTags;
	}

	// Retrieves list of Project_TechnologyTags via TechnologyTagID in DTO form
	public List<Project_TechnologyTagDTO> getProject_TechnologyTagsByTechnologyTagID(int technologyTagID) throws SQLException
	{
		// Result
		List<Project_TechnologyTagDTO> allProject_TechnologyTags = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS_TECHNOLOGY_TAGS WHERE TechnologyTagID=" + technologyTagID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		Project_TechnologyTagMapper mapper = new Project_TechnologyTagMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			Project_TechnologyTagDTO newProject_TechnologyTag = mapper.rowMap(rs);
			allProject_TechnologyTags.add(newProject_TechnologyTag);
		}

		return allProject_TechnologyTags;
	}

	// Retrieves list of Project_TechnologyTag via ProjectID AND TechnologyTagID in DTO form
	public Project_TechnologyTagDTO getProject_TechnologyTagByBothID(int projectID, int technologyTagID) throws SQLException
	{
		// Result
		Project_TechnologyTagDTO projectTechnologyTagDTO = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECTS_TECHNOLOGY_TAGS WHERE ProjectID=" + projectID + " AND TechnologyTagID=" + technologyTagID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		Project_TechnologyTagMapper mapper = new Project_TechnologyTagMapper();

		projectTechnologyTagDTO = mapper.rowMap(rs);

		return projectTechnologyTagDTO;
	}

	// Inserts project_TechnologyTag into database table
	public Project_TechnologyTagDTO createProject_TechnologyTag (Project_TechnologyTagDTO project_TechnologyTag) throws SQLException
	{

		// SQL Query statement
		String QUERY = "INSERT INTO PROJECTS_TECHNOLOGY_TAGS VALUES (";
		QUERY += project_TechnologyTag.getProjectID() + ", ";
		QUERY += project_TechnologyTag.getTechnologyID() + ")";

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		return project_TechnologyTag;
	}

	// No Update method needed for junction/association table

	// Deletes project_TechnologyTag
	public void deleteProject_TechnologyTag (Project_TechnologyTagDTO project_TechnologyTag) throws SQLException
	{
		int projectID = project_TechnologyTag.getProjectID();
		int technologyTagID = project_TechnologyTag.getTechnologyID();

		// SQL Query statement
		String QUERY = "DELETE FROM PROJECTS_TECHNOLOGY_TAGS WHERE ProjectID=" + projectID + " AND TechnologyTagID=" + technologyTagID;

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);
	}
}
