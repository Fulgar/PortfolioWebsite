package endpoints;

import dto.ContributorDTO;
import services.ListEmptyException;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/getAuthorization")
public class AuthEndpoint
{
	@GET
	@RolesAllowed({"User"})
	public boolean getSimpleResponse()
	{
		// Requesting this endpoint is the only way to prompt a BASIC login prompt
		return true;
	}
}
