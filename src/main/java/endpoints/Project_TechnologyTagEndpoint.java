package endpoints;

import dto.Project_ContributorDTO;
import dto.Project_TechnologyTagDTO;
import services.DTONullException;
import services.ListEmptyException;
import services.Project_TechnologyTagService;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/project_TechnologyTag")
public class Project_TechnologyTagEndpoint
{
	// Service Object
	private Project_TechnologyTagService project_TechnologyTagService = new Project_TechnologyTagService();

	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Project_TechnologyTagDTO> getAll() throws SQLException, ListEmptyException
	{
		return project_TechnologyTagService.getAllProject_TechnologyTags();
	}


	@GET
	@Path("/{ProjectID}/{TechnologyTagID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Project_TechnologyTagDTO getByID(@PathParam("ProjectID") int projectID, @PathParam("TechnologyTagID") int technologyTagID) throws SQLException, DTONullException
	{
		return project_TechnologyTagService.getProject_TechnologyTagByBothID(projectID, technologyTagID);
	}


	@GET
	@Path("/projectID/{ProjectID}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Project_TechnologyTagDTO> getListByProjectID(@PathParam("ProjectID") int projectID) throws SQLException, ListEmptyException
	{
		return project_TechnologyTagService.getProject_TechnologyTagsByProjectID(projectID);
	}


	@GET
	@Path("/technologyTagID/{TechnologyTagID}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Project_TechnologyTagDTO> getListByContributorID(@PathParam("TechnologyTagID") int technologyTagID) throws SQLException, ListEmptyException
	{
		return project_TechnologyTagService.getProject_TechnologyTagsByTechnologyTagID(technologyTagID);
	}


	@POST
	@RolesAllowed({"User"})
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Project_TechnologyTagDTO create(Project_TechnologyTagDTO project_TechnologyTagDTO) throws SQLException
	{
		return project_TechnologyTagService.createProject_TechnologyTag(project_TechnologyTagDTO);
	}

	@DELETE
	@RolesAllowed({"User"})
	@Path("/{ProjectID}/{TechnologyTagID}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void remove(@PathParam("ProjectID") int projectID, @PathParam("TechnologyTagID") int technologyTagID) throws SQLException
	{
		project_TechnologyTagService.deleteProject_TechnologyTag(projectID, technologyTagID);
	}
}
