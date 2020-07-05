package rowmap;

import dto.ProjectTypeDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProjectTypeMapper implements RowMapper <ProjectTypeDTO>
{
	@Override
	public ProjectTypeDTO rowMap(ResultSet rs) throws SQLException
	{
		ProjectTypeDTO projectType = new ProjectTypeDTO();
		projectType.setProjectTypeID(rs.getInt("ID"));
		projectType.setName(rs.getString("TypeName"));
		return projectType;
	}
}
