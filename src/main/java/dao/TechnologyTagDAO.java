package dao;

import dto.TechnologyTagDTO;
import dto.TechnologyTagDTO;
import rowmap.TechnologyTagMapper;
import rowmap.TechnologyTagMapper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TechnologyTagDAO
{
	// Retrieves all technologyTags from database
	public List<TechnologyTagDTO> getAllTechnologyTags() throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// List of all technologyTags in DTO form
		List<TechnologyTagDTO> allTechnologyTags = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM TECHNOLOGY_TAGS";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		TechnologyTagMapper mapper = new TechnologyTagMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			TechnologyTagDTO newTechnologyTag = mapper.rowMap(rs);
			allTechnologyTags.add(newTechnologyTag);
		}

		dbConnection.close();

		return allTechnologyTags;
	}


	// Retrieves TechnologyTag via ID in DTO form
	public TechnologyTagDTO getTechnologyTagByID(int ID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// Result
		TechnologyTagDTO technologyTag = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM TECHNOLOGY_TAGS WHERE ID=" + ID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		TechnologyTagMapper mapper = new TechnologyTagMapper();

		rs.first();
		technologyTag = mapper.rowMap(rs);

		dbConnection.close();

		return technologyTag;
	}


	// Retrieves TechnologyTags via ProjectID in DTO form
	public List<TechnologyTagDTO> getTechnologyTagsByProjectID(int ProjectID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// List of all technologyTags in DTO form
		List<TechnologyTagDTO> allTechnologyTags = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT TECHNOLOGY_TAGS.ID, TECHNOLOGY_TAGS.TechnologyName " +
				"FROM TECHNOLOGY_TAGS " +
				"INNER JOIN PROJECTS_TECHNOLOGY_TAGS ON TECHNOLOGY_TAGS.ID=PROJECTS_TECHNOLOGY_TAGS.TechnologyTagID " +
				"WHERE PROJECTS_TECHNOLOGY_TAGS.ProjectID=" + ProjectID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		TechnologyTagMapper mapper = new TechnologyTagMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			TechnologyTagDTO newTechnologyTag = mapper.rowMap(rs);
			allTechnologyTags.add(newTechnologyTag);
		}

		dbConnection.close();

		return allTechnologyTags;
	}


	// Inserts technologyTag into database table
	public TechnologyTagDTO createTechnologyTag (TechnologyTagDTO technologyTag) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "INSERT INTO TECHNOLOGY_TAGS (TechnologyName) VALUES (";
		QUERY += "'" + technologyTag.getTechnologyName() + "')";

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return technologyTag;
	}


	// Updates all fields (regardless of change) using ID
	public TechnologyTagDTO updateTechnologyTag (TechnologyTagDTO technologyTag) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "UPDATE TECHNOLOGY_TAGS SET ";
		QUERY += "TechnologyName='" + technologyTag.getTechnologyName() + "' ";
		QUERY += "WHERE ID=" + technologyTag.getTechnologyID();

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return technologyTag;
	}


	// Deletes technologyTag
	public void deleteTechnologyTag (int technologyTagID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "DELETE FROM TECHNOLOGY_TAGS WHERE ID=" + technologyTagID;

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();
	}
}
