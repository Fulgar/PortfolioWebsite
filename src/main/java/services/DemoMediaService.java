package services;

import dao.DemoMediaDAO;
import dto.DemoMediaDTO;

import java.sql.SQLException;
import java.util.List;

public class DemoMediaService
{
	// DAO object
	private DemoMediaDAO demoMediaDAO = new DemoMediaDAO();

	/**
	 * Returns all demoMedia in the database
	 * @return All demoMedia
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<DemoMediaDTO> getAllDemoMedias() throws SQLException, ListEmptyException
	{
		// Unsanitized result
		List<DemoMediaDTO> result = demoMediaDAO.getAllDemoMedia();

		// If list is empty throw exception
		if (result.size() == 0)
		{
			throw new ListEmptyException();
		}

		return result;
	}


	/**
	 * Retrieves DemoMedia via ID in DTO form
	 * @param ID
	 * @return DemoMedia via ID
	 * @throws SQLException
	 * @throws DTONullException
	 */
	public DemoMediaDTO getDemoMediaByID(int ID) throws SQLException, DTONullException
	{
		// Unsanitized result
		DemoMediaDTO result = demoMediaDAO.getDemoMediaByID(ID);

		// If list is empty throw exception
		if (result == null)
		{
			throw new DTONullException();
		}

		return result;
	}


	/**
	 * Retrieves DemoMedia via ProjectID in DTO form
	 * @param ProjectID
	 * @return DemoMedia via ProjectID
	 * @throws SQLException
	 */
	public List<DemoMediaDTO> getDemoMediaByProjectID(int ProjectID) throws SQLException
	{
		// Unsanitized result
		List<DemoMediaDTO> result = demoMediaDAO.getDemoMediaByProjectID(ProjectID);

		return result;
	}


	/**
	 * Inserts demoMedia into database table
	 * @param demoMedia
	 * @return Created demoMedia
	 * @throws SQLException
	 */
	public DemoMediaDTO createDemoMedia (DemoMediaDTO demoMedia) throws SQLException
	{
		return demoMediaDAO.createDemoMedia(demoMedia);
	}


	/**
	 * Updates all fields (regardless of change) using ID
	 * @param demoMedia
	 * @return Updated demoMedia
	 * @throws SQLException
	 */
	public DemoMediaDTO updateDemoMedia (DemoMediaDTO demoMedia) throws SQLException
	{
		return demoMediaDAO.updateDemoMedia(demoMedia);
	}

	/**
	 * Deletes demoMedia from database
	 * @param demoMediaID
	 * @throws SQLException
	 */
	public void deleteDemoMedia (int demoMediaID) throws SQLException
	{
		demoMediaDAO.deleteDemoMedia(demoMediaID);
	}
}
