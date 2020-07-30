package dto;

import java.io.Serializable;

public class DemoMediaDTO implements Serializable
{
	private int demoMediaID;
	private String url;
	private String mediaType;
	private String mediaTitle;
	private String mediaCaption;
	private int projectID;

	public DemoMediaDTO(int demoMediaID, String url, String mediaType, String mediaTitle, String mediaCaption, int projectID)
	{
		this.demoMediaID = demoMediaID;
		this.url = url;
		this.mediaType = mediaType;
		this.mediaTitle = mediaTitle;
		this.mediaCaption = mediaCaption;
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

	public String getMediaTitle()
	{
		return mediaTitle;
	}

	public void setMediaTitle(String mediaTitle)
	{
		this.mediaTitle = mediaTitle;
	}

	public String getMediaCaption()
	{
		return mediaCaption;
	}

	public void setMediaCaption(String mediaCaption)
	{
		this.mediaCaption = mediaCaption;
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
