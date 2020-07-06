package rowmap;

import dto.ProjectDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProjectMapper implements RowMapper <ProjectDTO>
{
	@Override
	public ProjectDTO rowMap(ResultSet rs) throws SQLException
	{
		ProjectDTO project = new ProjectDTO();
		project.setProjectID(rs.getInt("ID"));
		project.setTitle(rs.getString("Title"));
		project.setDescription(rs.getString("ProjectDescription"));
		project.setGithubLink(rs.getString("GithubLink"));
		project.setProjectTypeID(rs.getInt("ProjectTypeID"));
		Integer courseID = rs.getInt("CourseID");
		// Default int value for (SQL) NULL value is 0, therefore must set Integer object to null using wasNull()
		if (rs.wasNull())
		{
			courseID = null;
		}
		project.setCourseID(courseID);
		return project;
	}
}
