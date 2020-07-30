package dao;

import dto.CourseDTO;
import rowmap.CourseMapper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CourseDAO
{
	// Retrieves all courses from database
	public List<CourseDTO> getAllCourses() throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// List of all courses in DTO form
		List<CourseDTO> allCourses = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM COURSES";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		CourseMapper mapper = new CourseMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			CourseDTO newCourse = mapper.rowMap(rs);
			allCourses.add(newCourse);
		}

		dbConnection.close();

		return allCourses;
	}

	// Retrieves Course via ID in DTO form
	public CourseDTO getCourseByID(int ID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// Result
		CourseDTO course = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM COURSES WHERE ID=" + ID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		CourseMapper mapper = new CourseMapper();

		rs.first();
		course = mapper.rowMap(rs);

		dbConnection.close();

		return course;
	}


	// Retrieves Course via ProjectID in DTO form
	public CourseDTO getCourseByProjectID(int ProjectID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// Result
		CourseDTO course = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM COURSES WHERE COURSES.ID=(SELECT CourseID FROM PROJECTS WHERE PROJECTS.ID=" + ProjectID + ")";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY, dbConnection);

		CourseMapper mapper = new CourseMapper();

		rs.first();
		course = mapper.rowMap(rs);

		dbConnection.close();

		return course;
	}


	// Inserts course into database table
	public CourseDTO createCourse (CourseDTO course) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "INSERT INTO COURSES (SubjectName, CourseName) VALUES (";
		QUERY += "'" + course.getSubjectName() + "', ";
		QUERY += "'" + course.getCourseName() + "')";

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return course;
	}

	// Updates all fields (regardless of change) using ID
	public CourseDTO updateCourse (CourseDTO course) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "UPDATE COURSES SET ";
		QUERY += "SubjectName='" + course.getSubjectName() + "', ";
		QUERY += "CourseName='" + course.getCourseName() + "' ";
		QUERY += "WHERE ID=" + course.getCourseID();

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();

		return course;
	}

	// Deletes course
	public void deleteCourse (int courseID) throws SQLException
	{
		Connection dbConnection = DriverManager.getConnection(DatabaseWrapper.URL, DatabaseWrapper.USER, DatabaseWrapper.PASS);

		// SQL Query statement
		String QUERY = "DELETE FROM COURSES WHERE ID=" + courseID;

		// Executes statement
		int update = DatabaseWrapper.getQueryUpdate(QUERY, dbConnection);

		dbConnection.close();
	}
}
