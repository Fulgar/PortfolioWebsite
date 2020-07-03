package dto;

public class CourseDTO
{
	private int courseID;
	private String subject;
	private String courseName;

	public CourseDTO(int courseID, String subject, String courseName)
	{
		this.courseID = courseID;
		this.subject = subject;
		this.courseName = courseName;
	}

	public int getCourseID()
	{
		return courseID;
	}

	public void setCourseID(int courseID)
	{
		this.courseID = courseID;
	}

	public String getSubject()
	{
		return subject;
	}

	public void setSubject(String subject)
	{
		this.subject = subject;
	}

	public String getCourseName()
	{
		return courseName;
	}

	public void setCourseName(String courseName)
	{
		this.courseName = courseName;
	}
}
