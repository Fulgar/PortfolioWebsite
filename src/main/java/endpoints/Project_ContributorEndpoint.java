package endpoints;

import dto.Project_ContributorDTO;
import services.Project_ContributorService;
import services.DTONullException;
import services.ListEmptyException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/project_contributor")
public class Project_ContributorEndpoint
{
	// Service Object
	private Project_ContributorService project_ContributorService = new Project_ContributorService();

	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Project_ContributorDTO> getAll() throws SQLException, ListEmptyException
	{
		return project_ContributorService.getAllProject_Contributors();
	}


	@GET
	@Path("/{ProjectID}/{ContributorID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Project_ContributorDTO getByID(@PathParam("ProjectID") int projectID, @PathParam("ContributorID") int contributorID) throws SQLException, DTONullException
	{
		return project_ContributorService.getProject_ContributorByBothID(projectID, contributorID);
	}


	@GET
	@Path("/projectID/{ProjectID}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Project_ContributorDTO> getListByProjectID(@PathParam("ProjectID") int projectID) throws SQLException, ListEmptyException
	{
		return project_ContributorService.getProject_ContributorsByProjectID(projectID);
	}


	@GET
	@Path("/contributorID/{ContributorID}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Project_ContributorDTO> getListByContributorID(@PathParam("ContributorID") int contributorID) throws SQLException, ListEmptyException
	{
		return project_ContributorService.getProject_ContributorsByProjectID(contributorID);
	}


	@POST
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Project_ContributorDTO create(Project_ContributorDTO project_ContributorDTO) throws SQLException
	{
		return project_ContributorService.createProject_Contributor(project_ContributorDTO);
	}

	@DELETE
	@Path("/{ProjectID}/{ContributorID}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void remove(@PathParam("ProjectID") int projectID, @PathParam("ContributorID") int contributorID) throws SQLException
	{
		project_ContributorService.deleteProject_Contributor(projectID, contributorID);
	}
}
