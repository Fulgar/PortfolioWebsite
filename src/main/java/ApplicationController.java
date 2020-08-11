//import endpoints.TestEndpoint;

import endpoints.*;

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
		singletons.add(new CourseEndpoint());
		singletons.add(new DemoMediaEndpoint());
		singletons.add(new Project_ContributorEndpoint());
		singletons.add(new Project_TechnologyTagEndpoint());
		singletons.add(new ProjectEndpoint());
		singletons.add(new ProjectTypeEndpoint());
		singletons.add(new TechnologyTagEndpoint());
		singletons.add(new AuthEndpoint());
	}

	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}
}
