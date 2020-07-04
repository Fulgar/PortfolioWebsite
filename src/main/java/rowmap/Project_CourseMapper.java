package rowmap;

import dto.Project_CourseDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Project_CourseMapper implements RowMapper <Project_CourseDTO>
{
	@Override
	public Project_CourseDTO rowMap(ResultSet rs) throws SQLException
	{
		Project_CourseDTO projectCourse = new Project_CourseDTO();
		projectCourse.setProjectID(rs.getInt("ProjectID"));
		projectCourse.setCourseID(rs.getInt("CourseID"));
		return projectCourse;
	}
}
