package endpoints;

import dto.CourseDTO;
import services.CourseService;
import services.DTONullException;
import services.ListEmptyException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/course")
public class CourseEndpoint
{
	// Service Object
	private CourseService courseService = new CourseService();

	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public List<CourseDTO> getAll() throws SQLException, ListEmptyException
	{
		return courseService.getAllCourses();
	}


	@GET
	@Path("/{ID}")
	@Produces(MediaType.APPLICATION_JSON)
	public CourseDTO getByID(@PathParam("ID") int ID) throws SQLException, DTONullException
	{
		return courseService.getCourseByID(ID);
	}


	@POST
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public CourseDTO create(CourseDTO courseDTO) throws SQLException
	{
		return courseService.createCourse(courseDTO);
	}

	@DELETE
	@Path("/{ID}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void remove(@PathParam("ID") int ID) throws SQLException
	{
		courseService.deleteCourse(ID);
	}
}
