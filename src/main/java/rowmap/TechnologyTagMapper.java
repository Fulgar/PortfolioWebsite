package rowmap;

import dto.TechnologyTagDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TechnologyTagMapper implements RowMapper <TechnologyTagDTO>
{
	@Override
	public TechnologyTagDTO rowMap(ResultSet rs) throws SQLException
	{
		TechnologyTagDTO technologyTag = new TechnologyTagDTO();
		technologyTag.setTechnologyID(rs.getInt("ID"));
		technologyTag.setName(rs.getString("Name"));
		return technologyTag;
	}
}
