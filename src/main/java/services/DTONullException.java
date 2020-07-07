package services;

public class DTONullException extends Exception
{
	public String errorMessage()
	{
		return "DTO object is null!";
	}
}
