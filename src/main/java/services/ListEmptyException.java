package services;

public class ListEmptyException extends Exception
{
	public String errorMessage()
	{
		return "DTO object list is empty!";
	}
}
