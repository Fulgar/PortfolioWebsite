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
		project.setDescription(rs.getString("Description"));
		project.setGithubLink(rs.getString("GithubLink"));
		project.setProjectTypeID(rs.getInt("ProjectTypeID"));
		return project;
	}
}
