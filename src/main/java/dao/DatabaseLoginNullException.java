package dao;

public class DatabaseLoginNullException extends Throwable
{
	public String errorMessage()
	{
		return "Database Login password returned null. Ensure MYSQL_LOGIN environment variable is valid and set.";
	}
}
