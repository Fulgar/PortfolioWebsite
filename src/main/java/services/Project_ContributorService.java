package services;

import dao.Project_ContributorDAO;
import dto.Project_ContributorDTO;
import dto.Project_ContributorDTO;

import java.sql.SQLException;
import java.util.List;

public class Project_ContributorService
{
	// DAO object
	private Project_ContributorDAO project_ContributorDAO = new Project_ContributorDAO();


	/**
	 * Returns all project_Contributors in the database
	 * @return All project_Contributors
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<Project_ContributorDTO> getAllProject_Contributors() throws SQLException, ListEmptyException
	{
		// Unsanitized result
		List<Project_ContributorDTO> result = project_ContributorDAO.getAllProject_Contributors();

		// If list is empty throw exception
		if (result.size() == 0)
		{
			throw new ListEmptyException();
		}

		return result;
	}


	/**
	 * Retrieves list of Project_Contributors via ProjectID in DTO form
	 * @param projectID
	 * @return All project_Contributors matching projectID
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<Project_ContributorDTO> getProject_ContributorsByProjectID(int projectID) throws SQLException
	{
		// Unsanitized result
		List<Project_ContributorDTO> result = project_ContributorDAO.getProject_ContributorsByProjectID(projectID);

		return result;
	}


	/**
	 * Retrieves list of Project_Contributors via ContributorID in DTO form
	 * @param contributorID
	 * @return All project_Contributors matching contributorID
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<Project_ContributorDTO> getProject_ContributorsByContributorID(int contributorID) throws SQLException
	{
		// Unsanitized result
		List<Project_ContributorDTO> result = project_ContributorDAO.getProject_ContributorsByContributorID(contributorID);

		return result;
	}


	/**
	 * Retrieves Project_Contributor via ProjectID AND ContributorID in DTO form
	 * @param projectID
	 * @param contributorID
	 * @return All project_Contributors matching projectID and contributorID
	 * @throws SQLException
	 * @throws DTONullException
	 */
	public Project_ContributorDTO getProject_ContributorByBothID(int projectID, int contributorID) throws SQLException, DTONullException
	{
		// Unsanitized result
		Project_ContributorDTO result = project_ContributorDAO.getProject_ContributorByBothID(projectID, contributorID);

		// If list is empty throw exception
		if (result == null)
		{
			throw new DTONullException();
		}

		return result;
	}


	/**
	 * Inserts project_Contributor into database table
	 * @param project_Contributor
	 * @return Created project_Contributor
	 * @throws SQLException
	 */
	public Project_ContributorDTO createProject_Contributor (Project_ContributorDTO project_Contributor) throws SQLException
	{
		return project_ContributorDAO.createProject_Contributor(project_Contributor);
	}


	/**
	 * Deletes project_Contributor from database
	 * @param projectID
	 * @param contributorID
	 * @throws SQLException
	 */
	public void deleteProject_Contributor (int projectID, int contributorID) throws SQLException
	{
		project_ContributorDAO.deleteProject_Contributor(projectID, contributorID);
	}
}
