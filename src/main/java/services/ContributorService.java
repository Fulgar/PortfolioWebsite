package services;

import dao.ContributorDAO;
import dto.ContributorDTO;
import java.sql.SQLException;
import java.util.List;

public class ContributorService
{
	// DAO object
	private ContributorDAO contributorDAO = new ContributorDAO();


	/**
	 * Returns all contributors in the database
	 * @return All contributors
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<ContributorDTO> getAllContributors() throws SQLException, ListEmptyException
	{
		// Unsanitized result
		List<ContributorDTO> result = contributorDAO.getAllContributors();

		// If list is empty throw exception
		if (result.size() == 0)
		{
			throw new ListEmptyException();
		}

		return result;
	}


	/**
	 * Retrieves Contributor via ID in DTO form
	 * @param ID
	 * @return Contributor via ID
	 * @throws SQLException
	 * @throws DTONullException
	 */
	public ContributorDTO getContributorByID(int ID) throws SQLException, DTONullException
	{
		// Unsanitized result
		ContributorDTO result = contributorDAO.getContributorByID(ID);

		// If list is empty throw exception
		if (result == null)
		{
			throw new DTONullException();
		}

		return result;
	}


	/**
	 * Inserts contributor into database table
	 * @param contributor
	 * @return Created contributor
	 * @throws SQLException
	 */
	public ContributorDTO createContributor (ContributorDTO contributor) throws SQLException
	{
		return contributorDAO.createContributor(contributor);
	}


	/**
	 * Updates all fields (regardless of change) using ID
	 * @param contributor
	 * @return Updated contributor
	 * @throws SQLException
	 */
	public ContributorDTO updateContributor (ContributorDTO contributor) throws SQLException
	{
		return contributorDAO.updateContributor(contributor);
	}

	/**
	 * Deletes contributor from database
	 * @param contributor
	 * @throws SQLException
	 */
	public void deleteContributor (ContributorDTO contributor) throws SQLException
	{
		contributorDAO.deleteContributor(contributor);
	}
}
