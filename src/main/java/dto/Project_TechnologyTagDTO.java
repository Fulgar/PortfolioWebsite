package dto;

import java.io.Serializable;

public class Project_TechnologyTagDTO implements Serializable
{
	private int projectID;
	private int technologyTagID;

	public Project_TechnologyTagDTO(int projectID, int technologyTagID)
	{
		this.projectID = projectID;
		this.technologyTagID = technologyTagID;
	}

	public Project_TechnologyTagDTO()
	{
	}

	public int getProjectID()
	{
		return projectID;
	}

	public void setProjectID(int projectID)
	{
		this.projectID = projectID;
	}

	public int getTechnologyTagID()
	{
		return technologyTagID;
	}

	public void setTechnologyTagID(int technologyTagID)
	{
		this.technologyTagID = technologyTagID;
	}
}
