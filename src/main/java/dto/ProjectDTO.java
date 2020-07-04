package dto;

public class ProjectDTO
{
	private int projectID;
	private String title;
	private String description;
	private String githubLink;
	private int projectTypeID;

	public ProjectDTO(int projectID, String title, String description, String githubLink, int projectTypeID)
	{
		this.projectID = projectID;
		this.title = title;
		this.description = description;
		this.githubLink = githubLink;
		this.projectTypeID = projectTypeID;
	}

	public ProjectDTO()
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

	public String getTitle()
	{
		return title;
	}

	public void setTitle(String title)
	{
		this.title = title;
	}

	public String getDescription()
	{
		return description;
	}

	public void setDescription(String description)
	{
		this.description = description;
	}

	public String getGithubLink()
	{
		return githubLink;
	}

	public void setGithubLink(String githubLink)
	{
		this.githubLink = githubLink;
	}

	public int getProjectTypeID()
	{
		return projectTypeID;
	}

	public void setProjectTypeID(int projectTypeID)
	{
		this.projectTypeID = projectTypeID;
	}
}
