package endpoints;

import dto.TechnologyTagDTO;
import dto.TechnologyTagDTO;
import services.TechnologyTagService;
import services.DTONullException;
import services.ListEmptyException;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/technologyTag")
public class TechnologyTagEndpoint
{
	// Service Object
	private TechnologyTagService technologyTagService = new TechnologyTagService();

	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public List<TechnologyTagDTO> getAll() throws SQLException
	{
		return technologyTagService.getAllTechnologyTags();
	}


	@GET
	@Path("/{ID}")
	@Produces(MediaType.APPLICATION_JSON)
	public TechnologyTagDTO getByID(@PathParam("ID") int ID) throws SQLException, DTONullException
	{
		return technologyTagService.getTechnologyTagByID(ID);
	}


	@GET
	@Path("/byProject/{ProjectID}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<TechnologyTagDTO> getByProjectID(@PathParam("ProjectID") int ProjectID) throws SQLException
	{
		return technologyTagService.getTechnologyTagsByProjectID(ProjectID);
	}


	@POST
	@RolesAllowed({"User"})
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public TechnologyTagDTO create(TechnologyTagDTO technologyTagDTO) throws SQLException
	{
		return technologyTagService.createTechnologyTag(technologyTagDTO);
	}


	@PUT
	@RolesAllowed({"User"})
	@Path("/update")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public TechnologyTagDTO update(TechnologyTagDTO technologyTagDTO) throws SQLException
	{
		return technologyTagService.updateTechnologyTag(technologyTagDTO);
	}


	@DELETE
	@RolesAllowed({"User"})
	@Path("/{ID}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void remove(@PathParam("ID") int ID) throws SQLException
	{
		technologyTagService.deleteTechnologyTag(ID);
	}
}
