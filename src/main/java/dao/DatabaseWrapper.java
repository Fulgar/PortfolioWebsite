package dao;

import java.sql.*;

public class DatabaseWrapper
{
	public static final String URL = "jdbc:mysql://localhost:3306/test";
	public static final String USER = "Wildfly";
	public static final String PASS = "SecretPassword1234!";


	/**
	 * Executes READ queries
	 * @param query
	 * @param dbConnection
	 * @return Result set of READ query
	 * @throws SQLException
	 */
	public static ResultSet getQueryResult(String query, Connection dbConnection) throws SQLException
	{
		PreparedStatement stmnt = dbConnection.prepareStatement(query, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		ResultSet rs = stmnt.executeQuery(query);
		return rs;
	}


	/**
	 * Executes queries that modify the database
	 * @param query
	 * @param dbConnection
	 * @return Modifying query status integer
	 * @throws SQLException
	 */
	public static int getQueryUpdate(String query, Connection dbConnection) throws SQLException
	{
		PreparedStatement stmnt = dbConnection.prepareStatement(query, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		int update = stmnt.executeUpdate(query);
		return update;
	}

}
