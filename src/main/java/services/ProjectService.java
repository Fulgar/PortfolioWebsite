package services;

import dao.ProjectDAO;
import dto.ProjectDTO;

import java.sql.SQLException;
import java.util.List;

public class ProjectService
{
	// DAO object
	private ProjectDAO projectDAO = new ProjectDAO();

	/**
	 * Returns all projects in the database
	 * @return All projects
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<ProjectDTO> getAllProjects() throws SQLException, ListEmptyException
	{
		// Unsanitized result
		List<ProjectDTO> result = projectDAO.getAllProjects();

		// If list is empty throw exception
		if (result.size() == 0)
		{
			throw new ListEmptyException();
		}

		return result;
	}


	/**
	 * Retrieves Project via ID in DTO form
	 * @param ID
	 * @return Project via ID
	 * @throws SQLException
	 * @throws DTONullException
	 */
	public ProjectDTO getProjectByID(int ID) throws SQLException, DTONullException
	{
		// Unsanitized result
		ProjectDTO result = projectDAO.getProjectByID(ID);

		// If result is null throw exception
		if (result == null)
		{
			throw new DTONullException();
		}

		return result;
	}


	/**
	 * Inserts project into database table
	 * @param project
	 * @return Created project
	 * @throws SQLException
	 */
	public ProjectDTO createProject (ProjectDTO project) throws SQLException
	{
		return projectDAO.createProject(project);
	}


	/**
	 * Updates all fields (regardless of change) using ID
	 * @param project
	 * @return Updated project
	 * @throws SQLException
	 */
	public ProjectDTO updateProject (ProjectDTO project) throws SQLException
	{
		return projectDAO.updateProject(project);
	}


	/**
	 * Deletes project from database
	 * @param project
	 * @throws SQLException
	 */
	public void deleteProject (ProjectDTO project) throws SQLException
	{
		projectDAO.deleteProject(project);
	}
}
