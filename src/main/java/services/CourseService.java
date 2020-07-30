package services;

import dao.CourseDAO;
import dto.CourseDTO;

import java.sql.SQLException;
import java.util.List;

public class CourseService
{
	// DAO object
	private CourseDAO courseDAO = new CourseDAO();

	/**
	 * Returns all courses in the database
	 * @return All courses
	 * @throws SQLException
	 * @throws ListEmptyException
	 */
	public List<CourseDTO> getAllCourses() throws SQLException, ListEmptyException
	{
		// Unsanitized result
		List<CourseDTO> result = courseDAO.getAllCourses();

		// If list is empty throw exception
		if (result.size() == 0)
		{
			throw new ListEmptyException();
		}

		return result;
	}


	/**
	 * Retrieves Course via ID in DTO form
	 * @param ID
	 * @return Course via ID
	 * @throws SQLException
	 * @throws DTONullException
	 */
	public CourseDTO getCourseByID(int ID) throws SQLException, DTONullException
	{
		// Unsanitized result
		CourseDTO result = courseDAO.getCourseByID(ID);

		// If list is empty throw exception
		if (result == null)
		{
			throw new DTONullException();
		}

		return result;
	}


	/**
	 * Retrieves Course via ProjectID in DTO form
	 * @param ProjectID
	 * @return Course via ProjectID
	 * @throws SQLException
	 * @throws DTONullException
	 */
	public CourseDTO getCourseByProjectID(int ProjectID) throws SQLException, DTONullException
	{
		// Unsanitized result
		CourseDTO result = courseDAO.getCourseByProjectID(ProjectID);

		// If list is empty throw exception
		if (result == null)
		{
			throw new DTONullException();
		}

		return result;
	}


	/**
	 * Inserts course into database table
	 * @param course
	 * @return Created course
	 * @throws SQLException
	 */
	public CourseDTO createCourse (CourseDTO course) throws SQLException
	{
		return courseDAO.createCourse(course);
	}


	/**
	 * Updates all fields (regardless of change) using ID
	 * @param course
	 * @return Updated course
	 * @throws SQLException
	 */
	public CourseDTO updateCourse (CourseDTO course) throws SQLException
	{
		return courseDAO.updateCourse(course);
	}

	/**
	 * Deletes course from database
	 * @param courseID
	 * @throws SQLException
	 */
	public void deleteCourse (int courseID) throws SQLException
	{
		courseDAO.deleteCourse(courseID);
	}
}
