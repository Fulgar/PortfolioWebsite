package dao;

import dto.ProjectTypeDTO;
import dto.ProjectTypeDTO;
import rowmap.ProjectTypeMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProjectTypeDAO
{
	// Retrieves all projects from database
	public List<ProjectTypeDTO> getAllProjectTypes() throws SQLException
	{
		// List of all projects in DTO form
		List<ProjectTypeDTO> allProjectTypes = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECT_TYPES";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		ProjectTypeMapper mapper = new ProjectTypeMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			ProjectTypeDTO newProjectType = mapper.rowMap(rs);
			allProjectTypes.add(newProjectType);
		}

		return allProjectTypes;
	}

	// Retrieves Project via ID in DTO form
	public ProjectTypeDTO getProjectTypeByID(int ID) throws SQLException
	{
		// Result
		ProjectTypeDTO projectType = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM PROJECT_TYPES WHERE ID=" + ID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		ProjectTypeMapper mapper = new ProjectTypeMapper();

		projectType = mapper.rowMap(rs);

		return projectType;
	}

	// Inserts projectType into database table
	public ProjectTypeDTO createProjectType (ProjectTypeDTO projectType) throws SQLException
	{

		// SQL Query statement
		String QUERY = "INSERT INTO PROJECT_TYPES (TypeName) VALUES (";
		QUERY += projectType.getName() + ")";

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		return projectType;
	}

	// Updates all fields (regardless of change) using ID
	public ProjectTypeDTO updateProjectType (ProjectTypeDTO projectType) throws SQLException
	{
		// SQL Query statement
		String QUERY = "UPDATE PROJECT_TYPES SET ";
		QUERY += "TypeName='" + projectType.getName() + "' ";
		QUERY += "WHERE ID=" + projectType.getProjectTypeID();

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		return projectType;
	}

	// Deletes projectType
	public void deleteProjectType (ProjectTypeDTO projectType) throws SQLException
	{
		// SQL Query statement
		String QUERY = "DELETE FROM PROJECT_TYPES WHERE ID=" + projectType.getProjectTypeID();

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);
	}
}
