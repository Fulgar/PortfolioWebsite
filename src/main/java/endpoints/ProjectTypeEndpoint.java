package endpoints;

import dto.ProjectTypeDTO;
import services.ProjectTypeService;
import services.DTONullException;
import services.ListEmptyException;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/projectType")
public class ProjectTypeEndpoint
{
	// Service Object
	private ProjectTypeService projectTypeService = new ProjectTypeService();

	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ProjectTypeDTO> getAll() throws SQLException, ListEmptyException
	{
		return projectTypeService.getAllProjectTypes();
	}


	@GET
	@Path("/{ID}")
	@Produces(MediaType.APPLICATION_JSON)
	public ProjectTypeDTO getByID(@PathParam("ID") int ID) throws SQLException, DTONullException
	{
		return projectTypeService.getProjectTypeByID(ID);
	}


	@GET
	@Path("/byProject/{ProjectID}")
	@Produces(MediaType.APPLICATION_JSON)
	public ProjectTypeDTO getByProjectID(@PathParam("ProjectID") int ProjectID) throws SQLException, DTONullException
	{
		return projectTypeService.getProjectTypeByProjectID(ProjectID);
	}


	@POST
	@RolesAllowed({"User"})
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ProjectTypeDTO create(ProjectTypeDTO projectTypeDTO) throws SQLException
	{
		return projectTypeService.createProjectType(projectTypeDTO);
	}


	@PUT
	@RolesAllowed({"User"})
	@Path("/update")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ProjectTypeDTO update(ProjectTypeDTO projectTypeDTO) throws SQLException
	{
		return projectTypeService.updateProjectType(projectTypeDTO);
	}


	@DELETE
	@RolesAllowed({"User"})
	@Path("/{ID}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void remove(@PathParam("ID") int ID) throws SQLException
	{
		projectTypeService.deleteProjectType(ID);
	}
}
