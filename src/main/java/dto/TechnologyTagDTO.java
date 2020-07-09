package dto;

import java.io.Serializable;

public class TechnologyTagDTO implements Serializable
{
	private int technologyID;
	private String technologyName;

	public TechnologyTagDTO(int technologyID, String technologyName)
	{
		this.technologyID = technologyID;
		this.technologyName = technologyName;
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

	public String getTechnologyName()
	{
		return technologyName;
	}

	public void setTechnologyName(String technologyName)
	{
		this.technologyName = technologyName;
	}
}
