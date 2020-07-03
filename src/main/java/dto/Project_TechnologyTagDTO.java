package dto;

public class Project_TechnologyTagDTO
{
	private int projectID;
	private int technologyID;

	public Project_TechnologyTagDTO(int projectID, int technologyID)
	{
		this.projectID = projectID;
		this.technologyID = technologyID;
	}

	public int getProjectID()
	{
		return projectID;
	}

	public void setProjectID(int projectID)
	{
		this.projectID = projectID;
	}

	public int getTechnologyID()
	{
		return technologyID;
	}

	public void setTechnologyID(int technologyID)
	{
		this.technologyID = technologyID;
	}
}
