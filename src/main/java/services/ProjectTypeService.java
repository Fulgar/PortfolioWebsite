package services;

import dao.ProjectTypeDAO;
import dto.ProjectTypeDTO;

import java.sql.SQLException;
import java.util.List;

public class ProjectTypeService
{
	// DAO object
	private ProjectTypeDAO projectTypeDAO = new ProjectTypeDAO();

	/**
	 * Returns all projectTypes in the database
	 * @return All projectTypes
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<ProjectTypeDTO> getAllProjectTypes() throws SQLException, ListEmptyException
	{
		// Unsanitized result
		List<ProjectTypeDTO> result = projectTypeDAO.getAllProjectTypes();

		// If list is empty throw exception
		if (result.size() == 0)
		{
			throw new ListEmptyException();
		}

		return result;
	}


	/**
	 * Retrieves ProjectType via ID in DTO form
	 * @param ID
	 * @return ProjectType via ID
	 * @throws SQLException
	 * @throws DTONullException
	 */
	public ProjectTypeDTO getProjectTypeByID(int ID) throws SQLException, DTONullException
	{
		// Unsanitized result
		ProjectTypeDTO result = projectTypeDAO.getProjectTypeByID(ID);

		// If list is empty throw exception
		if (result == null)
		{
			throw new DTONullException();
		}

		return result;
	}


	/**
	 * Inserts projectType into database table
	 * @param projectType
	 * @return Created projectType
	 * @throws SQLException
	 */
	public ProjectTypeDTO createProjectType (ProjectTypeDTO projectType) throws SQLException
	{
		return projectTypeDAO.createProjectType(projectType);
	}


	/**
	 * Updates all fields (regardless of change) using ID
	 * @param projectType
	 * @return Updated projectType
	 * @throws SQLException
	 */
	public ProjectTypeDTO updateProjectType (ProjectTypeDTO projectType) throws SQLException
	{
		return projectTypeDAO.updateProjectType(projectType);
	}

	/**
	 * Deletes projectType from database
	 * @param projectType
	 * @throws SQLException
	 */
	public void deleteProjectType (ProjectTypeDTO projectType) throws SQLException
	{
		projectTypeDAO.deleteProjectType(projectType);
	}
}
