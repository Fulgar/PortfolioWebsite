package dto;

import java.io.Serializable;

public class ContributorDTO implements Serializable
{
	private int contributorID;
	private String firstName;
	private String lastName;
	private String githubProfileLink;

	public ContributorDTO(int contributorID, String firstName, String lastName, String githubProfileLink)
	{
		this.contributorID = contributorID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.githubProfileLink = githubProfileLink;
	}

	public ContributorDTO()
	{
	}

	public int getContributorID()
	{
		return contributorID;
	}

	public void setContributorID(int contributorID)
	{
		this.contributorID = contributorID;
	}

	public String getFirstName()
	{
		return firstName;
	}

	public void setFirstName(String firstName)
	{
		this.firstName = firstName;
	}

	public String getLastName()
	{
		return lastName;
	}

	public void setLastName(String lastName)
	{
		this.lastName = lastName;
	}

	public String getGithubProfileLink()
	{
		return githubProfileLink;
	}

	public void setGithubProfileLink(String githubProfileLink)
	{
		this.githubProfileLink = githubProfileLink;
	}

	@Override
	public String toString()
	{
		return "ContributorDTO{" +
				"contributorID=" + contributorID +
				", firstName='" + firstName + '\'' +
				", lastName='" + lastName + '\'' +
				", githubProfileLink='" + githubProfileLink + '\'' +
				'}';
	}
}
