package dao;

import dto.CourseDTO;
import rowmap.CourseMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CourseDAO
{
	// Retrieves all courses from database
	public List<CourseDTO> getAllCourses() throws SQLException
	{
		// List of all courses in DTO form
		List<CourseDTO> allCourses = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM COURSES";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		CourseMapper mapper = new CourseMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			CourseDTO newCourse = mapper.rowMap(rs);
			allCourses.add(newCourse);
		}

		return allCourses;
	}

	// Retrieves Course via ID in DTO form
	public CourseDTO getCourseByID(int ID) throws SQLException
	{
		// Result
		CourseDTO course = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM COURSES WHERE ID=" + ID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		CourseMapper mapper = new CourseMapper();

		course = mapper.rowMap(rs);

		return course;
	}

	// Inserts course into database table
	public CourseDTO createCourse (CourseDTO course) throws SQLException
	{

		// SQL Query statement
		String QUERY = "INSERT INTO COURSES VALUES (";
		QUERY += course.getCourseID() + ", ";
		QUERY += course.getSubject() + ", ";
		QUERY += course.getCourseName() + ")";

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		return course;
	}

	// Updates all fields (regardless of change) using ID
	public CourseDTO updateCourse (CourseDTO course) throws SQLException
	{
		// SQL Query statement
		String QUERY = "UPDATE COURSES SET ";
		QUERY += "SubjectName='" + course.getSubject() + "', ";
		QUERY += "CourseName='" + course.getCourseName() + "' ";
		QUERY += "WHERE ID=" + course.getCourseID();

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		return course;
	}

	// Deletes course
	public void deleteCourse (CourseDTO course) throws SQLException
	{
		// SQL Query statement
		String QUERY = "DELETE FROM COURSES WHERE ID=" + course.getCourseID();

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);
	}
}