package rowmap;

import dto.Project_ContributorDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Project_ContributorMapper implements RowMapper <Project_ContributorDTO>
{
	@Override
	public Project_ContributorDTO rowMap(ResultSet rs) throws SQLException
	{
		Project_ContributorDTO projectContributor = new Project_ContributorDTO();
		projectContributor.setProjectID(rs.getInt("ProjectID"));
		projectContributor.setContributorID(rs.getInt("ContributorID"));
		return projectContributor;
	}
}
