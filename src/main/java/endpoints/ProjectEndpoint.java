package endpoints;

import dto.ProjectDTO;
import services.ProjectService;
import services.DTONullException;
import services.ListEmptyException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;
import javax.annotation.security.RolesAllowed;

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
	@RolesAllowed({"User"})
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ProjectDTO create(ProjectDTO projectDTO) throws SQLException
	{
		return projectService.createProject(projectDTO);
	}


	@PUT
	@RolesAllowed({"User"})
	@Path("/update")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ProjectDTO update(ProjectDTO projectDTO) throws SQLException
	{
		return projectService.updateProject(projectDTO);
	}


	@DELETE
	@RolesAllowed({"User"})
	@Path("/{ID}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void remove(@PathParam("ID") int ID) throws SQLException
	{
		projectService.deleteProject(ID);
	}
}
