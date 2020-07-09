//import endpoints.TestEndpoint;

import endpoints.ContributorEndpoint;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

public class ApplicationController extends Application
{
	private Set<Object> singletons = new HashSet<>();

	// Adds endpoints
	public ApplicationController() {
		singletons.add(new ContributorEndpoint());
	}

	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}
}
