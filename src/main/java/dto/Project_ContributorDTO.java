package dto;

import java.io.Serializable;

public class Project_ContributorDTO implements Serializable
{
	private int projectID;
	private int contributorID;

	public Project_ContributorDTO(int projectID, int contributorID)
	{
		this.projectID = projectID;
		this.contributorID = contributorID;
	}

	public Project_ContributorDTO()
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

	public int getContributorID()
	{
		return contributorID;
	}

	public void setContributorID(int contributorID)
	{
		this.contributorID = contributorID;
	}
}
