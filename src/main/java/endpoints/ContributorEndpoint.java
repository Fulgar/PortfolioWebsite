package endpoints;

import dto.ContributorDTO;
import services.ContributorService;
import services.DTONullException;
import services.ListEmptyException;

import javax.print.attribute.standard.Media;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/contributor")
public class ContributorEndpoint
{
	// Service Object
	private ContributorService contributorService = new ContributorService();

	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ContributorDTO> getAll() throws SQLException, ListEmptyException
	{
		return contributorService.getAllContributors();
	}


	@GET
	@Path("/{ID}")
	@Produces(MediaType.APPLICATION_JSON)
	public ContributorDTO getByID(@PathParam("ID") int ID) throws SQLException, DTONullException
	{
		return contributorService.getContributorByID(ID);
	}


	@POST
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ContributorDTO create(ContributorDTO contributorDTO) throws SQLException
	{
		return contributorService.createContributor(contributorDTO);
	}

	@DELETE
	@Path("/remove")
	@Consumes(MediaType.APPLICATION_JSON)
	public void remove(ContributorDTO contributorDTO) throws SQLException
	{
		contributorService.deleteContributor(contributorDTO);
	}
}
