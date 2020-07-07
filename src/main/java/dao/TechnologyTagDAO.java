package dao;

import dto.TechnologyTagDTO;
import rowmap.TechnologyTagMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TechnologyTagDAO
{
	// Retrieves all technologyTags from database
	public List<TechnologyTagDTO> getAllTechnologyTags() throws SQLException
	{
		// List of all technologyTags in DTO form
		List<TechnologyTagDTO> allTechnologyTags = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM TECHNOLOGY_TAGS";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		TechnologyTagMapper mapper = new TechnologyTagMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			TechnologyTagDTO newTechnologyTag = mapper.rowMap(rs);
			allTechnologyTags.add(newTechnologyTag);
		}

		return allTechnologyTags;
	}

	// Retrieves TechnologyTag via ID in DTO form
	public TechnologyTagDTO getTechnologyTagByID(int ID) throws SQLException
	{
		// Result
		TechnologyTagDTO technologyTag = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM TECHNOLOGY_TAGS WHERE ID=" + ID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		TechnologyTagMapper mapper = new TechnologyTagMapper();

		technologyTag = mapper.rowMap(rs);

		return technologyTag;
	}

	// Inserts technologyTag into database table
	public TechnologyTagDTO createTechnologyTag (TechnologyTagDTO technologyTag) throws SQLException
	{

		// SQL Query statement
		String QUERY = "INSERT INTO TECHNOLOGY_TAGS VALUES (";
		QUERY += technologyTag.getTechnologyID() + ", ";
		QUERY += technologyTag.getName() + ")";

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		return technologyTag;
	}

	// Updates all fields (regardless of change) using ID
	public TechnologyTagDTO updateTechnologyTag (TechnologyTagDTO technologyTag) throws SQLException
	{
		// SQL Query statement
		String QUERY = "UPDATE TECHNOLOGY_TAGS SET ";
		QUERY += "TechnologyName='" + technologyTag.getName() + "' ";
		QUERY += "WHERE ID=" + technologyTag.getTechnologyID();

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		return technologyTag;
	}

	// Deletes technologyTag
	public void deleteTechnologyTag (TechnologyTagDTO technologyTag) throws SQLException
	{
		// SQL Query statement
		String QUERY = "DELETE FROM TECHNOLOGY_TAGS WHERE ID=" + technologyTag.getTechnologyID();

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);
	}
}
