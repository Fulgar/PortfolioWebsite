package dto;

public class TechnologyTagDTO
{
	private int technologyID;
	private String name;

	public TechnologyTagDTO(int technologyID, String name)
	{
		this.technologyID = technologyID;
		this.name = name;
	}

	public int getTechnologyID()
	{
		return technologyID;
	}

	public void setTechnologyID(int technologyID)
	{
		this.technologyID = technologyID;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}
}
