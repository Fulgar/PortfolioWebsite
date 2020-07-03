package dto;

public class Project_CourseDTO
{
	private int projectID;
	private int courseID;

	public Project_CourseDTO(int projectID, int courseID)
	{
		this.projectID = projectID;
		this.courseID = courseID;
	}

	public int getProjectID()
	{
		return projectID;
	}

	public void setProjectID(int projectID)
	{
		this.projectID = projectID;
	}

	public int getCourseID()
	{
		return courseID;
	}

	public void setCourseID(int courseID)
	{
		this.courseID = courseID;
	}
}
