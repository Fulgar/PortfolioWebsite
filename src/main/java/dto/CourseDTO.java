package dto;

import java.io.Serializable;

public class CourseDTO implements Serializable
{
	private int courseID;
	private String subjectName;
	private String courseName;

	public CourseDTO(int courseID, String subjectName, String courseName)
	{
		this.courseID = courseID;
		this.subjectName = subjectName;
		this.courseName = courseName;
	}

	public CourseDTO()
	{
	}

	public int getCourseID()
	{
		return courseID;
	}

	public void setCourseID(int courseID)
	{
		this.courseID = courseID;
	}

	public String getSubjectName()
	{
		return subjectName;
	}

	public void setSubjectName(String subjectName)
	{
		this.subjectName = subjectName;
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
