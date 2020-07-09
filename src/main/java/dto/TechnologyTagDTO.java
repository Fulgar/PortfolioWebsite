package dto;

import java.io.Serializable;

public class TechnologyTagDTO implements Serializable
{
	private int technologyID;
	private String name;

	public TechnologyTagDTO(int technologyID, String name)
	{
		this.technologyID = technologyID;
		this.name = name;
	}

	public TechnologyTagDTO()
	{
	}

	public int getTechnologyID()
	{
		return technologyID;
	}

	public void setTechnologyID(int technologyID)
	{
		this.technologyID = technologyID;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}
}
