package endpoints;

import dto.ProjectDTO;
import services.ProjectService;
import services.DTONullException;
import services.ListEmptyException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/project")
public class ProjectEndpoint
{
	// Service Object
	private ProjectService projectService = new ProjectService();

	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ProjectDTO> getAll() throws SQLException, ListEmptyException
	{
		return projectService.getAllProjects();
	}


	@GET
	@Path("/{ID}")
	@Produces(MediaType.APPLICATION_JSON)
	public ProjectDTO getByID(@PathParam("ID") int ID) throws SQLException, DTONullException
	{
		return projectService.getProjectByID(ID);
	}


	@POST
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ProjectDTO create(ProjectDTO projectDTO) throws SQLException
	{
		return projectService.createProject(projectDTO);
	}

	@DELETE
	@Path("/{ID}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void remove(@PathParam("ID") int ID) throws SQLException
	{
		projectService.deleteProject(ID);
	}
}
