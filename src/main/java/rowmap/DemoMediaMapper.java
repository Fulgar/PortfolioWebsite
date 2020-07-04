package rowmap;

import dto.CourseDTO;
import dto.DemoMediaDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DemoMediaMapper implements RowMapper <DemoMediaDTO>
{
	@Override
	public DemoMediaDTO rowMap(ResultSet rs) throws SQLException
	{
		DemoMediaDTO demoMediaDTO = new DemoMediaDTO();
		demoMediaDTO.setDemoMediaID(rs.getInt("ID"));
		demoMediaDTO.setUrl(rs.getString("URL"));
		demoMediaDTO.setMediaType(rs.getString("MediaType"));
		demoMediaDTO.setProjectID(rs.getInt("ProjectID"));
		return demoMediaDTO;
	}
}
