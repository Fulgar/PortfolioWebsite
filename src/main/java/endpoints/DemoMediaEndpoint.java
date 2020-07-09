package endpoints;

import dto.DemoMediaDTO;
import services.DemoMediaService;
import services.DTONullException;
import services.ListEmptyException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/demoMedia")
public class DemoMediaEndpoint
{
	// Service Object
	private DemoMediaService demoMediaService = new DemoMediaService();

	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public List<DemoMediaDTO> getAll() throws SQLException, ListEmptyException
	{
		return demoMediaService.getAllDemoMedias();
	}


	@GET
	@Path("/{ID}")
	@Produces(MediaType.APPLICATION_JSON)
	public DemoMediaDTO getByID(@PathParam("ID") int ID) throws SQLException, DTONullException
	{
		return demoMediaService.getDemoMediaByID(ID);
	}


	@POST
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public DemoMediaDTO create(DemoMediaDTO demoMediaDTO) throws SQLException
	{
		return demoMediaService.createDemoMedia(demoMediaDTO);
	}

	@DELETE
	@Path("/{ID}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void remove(@PathParam("ID") int ID) throws SQLException
	{
		demoMediaService.deleteDemoMedia(ID);
	}
}
