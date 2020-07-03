package dto;

public class ProjectTypeDTO
{
	private int projectTypeID;
	private String name;

	public ProjectTypeDTO(int projectTypeID, String name)
	{
		this.projectTypeID = projectTypeID;
		this.name = name;
	}

	public int getProjectTypeID()
	{
		return projectTypeID;
	}

	public void setProjectTypeID(int projectTypeID)
	{
		this.projectTypeID = projectTypeID;
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
