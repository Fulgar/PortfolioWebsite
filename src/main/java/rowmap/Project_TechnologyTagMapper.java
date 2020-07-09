package rowmap;

import dto.Project_TechnologyTagDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Project_TechnologyTagMapper implements RowMapper <Project_TechnologyTagDTO>
{
	@Override
	public Project_TechnologyTagDTO rowMap(ResultSet rs) throws SQLException
	{
		Project_TechnologyTagDTO projectTechnologyTag = new Project_TechnologyTagDTO();
		projectTechnologyTag.setProjectID(rs.getInt("ProjectID"));
		projectTechnologyTag.setTechnologyTagID(rs.getInt("TechnologyTagID"));
		return projectTechnologyTag;
	}
}
