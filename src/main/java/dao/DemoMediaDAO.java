package dao;

import dto.DemoMediaDTO;
import rowmap.DemoMediaMapper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DemoMediaDAO
{
	// Retrieves all demoMedia from database
	public List<DemoMediaDTO> getAllDemoMedia() throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// List of all demoMedia in DTO form
		List<DemoMediaDTO> allDemoMedia = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM DEMO_MEDIA";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		DemoMediaMapper mapper = new DemoMediaMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			DemoMediaDTO newDemoMedia = mapper.rowMap(rs);
			allDemoMedia.add(newDemoMedia);
		}

		dbConnection.close();

		return allDemoMedia;
	}

	// Retrieves DemoMedia via ID in DTO form
	public DemoMediaDTO getDemoMediaByID(int ID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// Result
		DemoMediaDTO demoMedia = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM DEMO_MEDIA WHERE ID=" + ID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		DemoMediaMapper mapper = new DemoMediaMapper();

		demoMedia = mapper.rowMap(rs);

		dbConnection.close();

		return demoMedia;
	}

	// Inserts demoMedia into database table
	public DemoMediaDTO createDemoMedia (DemoMediaDTO demoMedia) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "INSERT INTO DEMO_MEDIA (URL, MediaType, ProjectID) VALUES (";
		QUERY += "'" + demoMedia.getUrl() + "', ";
		QUERY += "'" + demoMedia.getMediaType() + "', ";
		QUERY += demoMedia.getProjectID() + ")";

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return demoMedia;
	}

	// Updates all fields (regardless of change) using ID
	public DemoMediaDTO updateDemoMedia (DemoMediaDTO demoMedia) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "UPDATE DEMO_MEDIA SET ";
		QUERY += "URL='" + demoMedia.getUrl() + "', ";
		QUERY += "MediaType='" + demoMedia.getMediaType() + "', ";
		QUERY += "ProjectID=" + demoMedia.getProjectID() + " ";
		QUERY += "WHERE ID=" + demoMedia.getDemoMediaID();

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return demoMedia;
	}

	// Deletes demoMedia
	public void deleteDemoMedia (DemoMediaDTO demoMedia) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "DELETE FROM DEMO_MEDIA WHERE ID=" + demoMedia.getDemoMediaID();

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();
	}
}
