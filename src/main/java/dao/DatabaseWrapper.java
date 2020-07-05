package dao;

import java.sql.*;

public class DatabaseWrapper
{
	private static Connection dbConnection;
	private final String URL = "jdbc:mysql://localhost:3306/test";
	private final String USER = "Wildfly";
	private final String PASS = "SecretPassword1234!";

	public DatabaseWrapper() throws SQLException
	{
		dbConnection = DriverManager.getConnection(URL, USER, PASS);
	}


	public static ResultSet getQueryResult(String query) throws SQLException
	{
		Statement stmnt = dbConnection.createStatement();
		ResultSet rs = stmnt.executeQuery(query);
		dbConnection.close();
		return rs;
	}

}
