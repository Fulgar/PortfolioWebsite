package dto;

public class DemoMediaDTO
{
	private int demoMediaID;
	private String url;
	private String mediaType;
	private int projectID;

	public DemoMediaDTO(int demoMediaID, String url, String mediaType, int projectID)
	{
		this.demoMediaID = demoMediaID;
		this.url = url;
		this.mediaType = mediaType;
		this.projectID = projectID;
	}

	public DemoMediaDTO()
	{
	}

	public int getDemoMediaID()
	{
		return demoMediaID;
	}

	public void setDemoMediaID(int demoMediaID)
	{
		this.demoMediaID = demoMediaID;
	}

	public String getUrl()
	{
		return url;
	}

	public void setUrl(String url)
	{
		this.url = url;
	}

	public String getMediaType()
	{
		return mediaType;
	}

	public void setMediaType(String mediaType)
	{
		this.mediaType = mediaType;
	}

	public int getProjectID()
	{
		return projectID;
	}

	public void setProjectID(int projectID)
	{
		this.projectID = projectID;
	}
}
