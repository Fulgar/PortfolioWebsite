package rowmap;

import dto.CourseDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CourseMapper implements RowMapper <CourseDTO>
{
	@Override
	public CourseDTO rowMap(ResultSet rs) throws SQLException
	{
		CourseDTO course = new CourseDTO();
		course.setCourseID(rs.getInt("ID"));
		course.setSubjectName(rs.getString("SubjectName"));
		course.setCourseName(rs.getString("CourseName"));
		return course;
	}
}
