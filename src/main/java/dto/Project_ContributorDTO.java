package dto;

public class Project_ContributorDTO
{
	private int projectID;
	private int contributorID;

	public Project_ContributorDTO(int projectID, int contributorID)
	{
		this.projectID = projectID;
		this.contributorID = contributorID;
	}

	public int getProjectID()
	{
		return projectID;
	}

	public void setProjectID(int projectID)
	{
		this.projectID = projectID;
	}

	public int getContributorID()
	{
		return contributorID;
	}

	public void setContributorID(int contributorID)
	{
		this.contributorID = contributorID;
	}
}
