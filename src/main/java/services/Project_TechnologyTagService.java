package services;

import dao.Project_TechnologyTagDAO;
import dto.Project_TechnologyTagDTO;

import java.sql.SQLException;
import java.util.List;

public class Project_TechnologyTagService
{
	// DAO object
	private Project_TechnologyTagDAO project_TechnologyTagDAO = new Project_TechnologyTagDAO();


	/**
	 * Returns all project_TechnologyTags in the database
	 * @return All project_TechnologyTags
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<Project_TechnologyTagDTO> getAllProject_TechnologyTags() throws SQLException, ListEmptyException
	{
		// Unsanitized result
		List<Project_TechnologyTagDTO> result = project_TechnologyTagDAO.getAllProject_TechnologyTags();

		// If list is empty throw exception
		if (result.size() == 0)
		{
			throw new ListEmptyException();
		}

		return result;
	}


	/**
	 * Retrieves list of Project_TechnologyTags via ProjectID in DTO form
	 * @param projectID
	 * @return All project_TechnologyTags matching projectID
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<Project_TechnologyTagDTO> getProject_TechnologyTagsByProjectID(int projectID) throws SQLException, ListEmptyException
	{
		// Unsanitized result
		List<Project_TechnologyTagDTO> result = project_TechnologyTagDAO.getProject_TechnologyTagsByProjectID(projectID);

		// If list is empty throw exception
		if (result.size() == 0)
		{
			throw new ListEmptyException();
		}

		return result;
	}


	/**
	 * Retrieves list of Project_TechnologyTags via TechnologyTagID in DTO form
	 * @param technologyTagID
	 * @return All project_TechnologyTags matching technologyTagID
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<Project_TechnologyTagDTO> getProject_TechnologyTagsByTechnologyTagID(int technologyTagID) throws SQLException, ListEmptyException
	{
		// Unsanitized result
		List<Project_TechnologyTagDTO> result = project_TechnologyTagDAO.getProject_TechnologyTagsByTechnologyTagID(technologyTagID);

		// If list is empty throw exception
		if (result.size() == 0)
		{
			throw new ListEmptyException();
		}

		return result;
	}


	/**
	 * Retrieves Project_TechnologyTag via ProjectID AND TechnologyTagID in DTO form
	 * @param projectID
	 * @param technologyTagID
	 * @return All project_TechnologyTags matching projectID and technologyTagID
	 * @throws SQLException
	 * @throws DTONullException
	 */
	public Project_TechnologyTagDTO getProject_TechnologyTagByBothID(int projectID, int technologyTagID) throws SQLException, DTONullException
	{
		// Unsanitized result
		Project_TechnologyTagDTO result = project_TechnologyTagDAO.getProject_TechnologyTagByBothID(projectID, technologyTagID);

		// If list is empty throw exception
		if (result == null)
		{
			throw new DTONullException();
		}

		return result;
	}


	/**
	 * Inserts project_TechnologyTag into database table
	 * @param project_TechnologyTag
	 * @return Created project_TechnologyTag
	 * @throws SQLException
	 */
	public Project_TechnologyTagDTO createProject_TechnologyTag (Project_TechnologyTagDTO project_TechnologyTag) throws SQLException
	{
		return project_TechnologyTagDAO.createProject_TechnologyTag(project_TechnologyTag);
	}


	/**
	 * Deletes project_TechnologyTag from database
	 * @param project_TechnologyTag
	 * @throws SQLException
	 */
	public void deleteProject_TechnologyTag (Project_TechnologyTagDTO project_TechnologyTag) throws SQLException
	{
		project_TechnologyTagDAO.deleteProject_TechnologyTag(project_TechnologyTag);
	}
}
