package dao;

import dto.ContributorDTO;
import rowmap.ContributorMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ContributorDAO
{
	// Retrieves all contributors from database
	public List<ContributorDTO> getAllContributors() throws SQLException
	{
		// List of all contributors in DTO form
		List<ContributorDTO> allContributors = new ArrayList<>();

		// SQL Query statement
		String QUERY = "SELECT * FROM CONTRIBUTORS";

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		ContributorMapper mapper = new ContributorMapper();

		// Iterate through results and map database entries into DTO objects
		while(rs.next())
		{
			ContributorDTO newContributor = mapper.rowMap(rs);
			allContributors.add(newContributor);
		}

		return allContributors;
	}

	// Retrieves Contributor via ID in DTO form
	public ContributorDTO getContributorByID(int ID) throws SQLException
	{
		// Result
		ContributorDTO contributor = null;

		// SQL Query statement
		String QUERY = "SELECT * FROM CONTRIBUTORS WHERE ID=" + ID;

		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		ContributorMapper mapper = new ContributorMapper();

		contributor = mapper.rowMap(rs);

		return contributor;
	}

	// Inserts contributor into database table
	public ContributorDTO createContributor (ContributorDTO contributor) throws SQLException
	{

		// SQL Query statement
		String QUERY = "INSERT INTO CONTRIBUTORS (FirstName, LastName, GithubProfileLink) VALUES (";
		QUERY += contributor.getFirstName() + ", ";
		QUERY += contributor.getLastName() + ", ";
		QUERY += contributor.getGithubProfileLink() + ")";

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		return contributor;
	}

	// Updates all fields (regardless of change) using ID
	public ContributorDTO updateContributor (ContributorDTO contributor) throws SQLException
	{
		// SQL Query statement
		String QUERY = "UPDATE CONTRIBUTORS SET ";
		QUERY += "FirstName='" + contributor.getFirstName() + "', ";
		QUERY += "LastName='" + contributor.getLastName() + "', ";
		QUERY += "GithubProfileLink='" + contributor.getGithubProfileLink() + "' ";
		QUERY += "WHERE ID=" + contributor.getContributorID();

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);

		return contributor;
	}

	// Deletes contributor
	public void deleteContributor (ContributorDTO contributor) throws SQLException
	{
		// SQL Query statement
		String QUERY = "DELETE FROM CONTRIBUTORS WHERE ID=" + contributor.getContributorID();

		// Executes statement
		ResultSet rs = DatabaseWrapper.getQueryResult(QUERY);
	}
}
