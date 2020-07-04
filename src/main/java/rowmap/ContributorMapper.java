package rowmap;

import dto.ContributorDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ContributorMapper implements RowMapper <ContributorDTO>
{
	@Override
	public ContributorDTO rowMap(ResultSet rs) throws SQLException
	{
		ContributorDTO contributor = new ContributorDTO();
		contributor.setContributorID(rs.getInt("ID"));
		contributor.setFirstName(rs.getString("FirstName"));
		contributor.setLastName(rs.getString("LastName"));
		contributor.setGithubProfileLink(rs.getString("GithubProfileLink"));
		return contributor;
	}
}
