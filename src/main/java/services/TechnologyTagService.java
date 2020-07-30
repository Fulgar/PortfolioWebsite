package services;

import dao.TechnologyTagDAO;
import dto.TechnologyTagDTO;
import dto.TechnologyTagDTO;

import java.sql.SQLException;
import java.util.List;

public class TechnologyTagService
{
	// DAO object
	private TechnologyTagDAO technologyTagDAO = new TechnologyTagDAO();

	/**
	 * Returns all technologyTags in the database
	 * @return All technologyTags
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<TechnologyTagDTO> getAllTechnologyTags() throws SQLException, ListEmptyException
	{
		// Unsanitized result
		List<TechnologyTagDTO> result = technologyTagDAO.getAllTechnologyTags();

		// If list is empty throw exception
		if (result.size() == 0)
		{
			throw new ListEmptyException();
		}

		return result;
	}


	/**
	 * Retrieves TechnologyTag via ID in DTO form
	 * @param ID
	 * @return TechnologyTag via ID
	 * @throws SQLException
	 * @throws DTONullException
	 */
	public TechnologyTagDTO getTechnologyTagByID(int ID) throws SQLException, DTONullException
	{
		// Unsanitized result
		TechnologyTagDTO result = technologyTagDAO.getTechnologyTagByID(ID);

		// If list is empty throw exception
		if (result == null)
		{
			throw new DTONullException();
		}

		return result;
	}


	/**
	 * Retrieves TechnologyTags via ProjectID in DTO form
	 * @param ProjectID
	 * @return TechnologyTag via ProjectID
	 * @throws SQLException
	 * @throws DTONullException
	 */
	public List<TechnologyTagDTO> getTechnologyTagsByProjectID(int ProjectID) throws SQLException, ListEmptyException
	{
		// Unsanitized result
		List<TechnologyTagDTO> result = technologyTagDAO.getTechnologyTagsByProjectID(ProjectID);

		// If list is empty throw exception
		if (result.size() == 0)
		{
			throw new ListEmptyException();
		}

		return result;
	}


	/**
	 * Inserts technologyTag into database table
	 * @param technologyTag
	 * @return Created technologyTag
	 * @throws SQLException
	 */
	public TechnologyTagDTO createTechnologyTag (TechnologyTagDTO technologyTag) throws SQLException
	{
		return technologyTagDAO.createTechnologyTag(technologyTag);
	}


	/**
	 * Updates all fields (regardless of change) using ID
	 * @param technologyTag
	 * @return Updated technologyTag
	 * @throws SQLException
	 */
	public TechnologyTagDTO updateTechnologyTag (TechnologyTagDTO technologyTag) throws SQLException
	{
		return technologyTagDAO.updateTechnologyTag(technologyTag);
	}

	/**
	 * Deletes technologyTag from database
	 * @param technologyTagID
	 * @throws SQLException
	 */
	public void deleteTechnologyTag (int technologyTagID) throws SQLException
	{
		technologyTagDAO.deleteTechnologyTag(technologyTagID);
	}
}
