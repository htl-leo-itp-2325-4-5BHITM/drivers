package at.htl.drive.ride.boundary;

import at.htl.drive.ride.DrivUserMapper;
import at.htl.drive.ride.model.Ride;
import at.htl.drive.ride.dto.RideDto;
import at.htl.drive.ride.RideMapper;
import at.htl.drive.ride.repository.DriveRepository;
import at.htl.drive.ride.repository.UserRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

@Path("/users")
public class UserResource {
    @Inject
    UserRepository repository;
    @Inject
    DrivUserMapper mapper;

    @GET
    public Response all() {
        System.out.println("bin im all");
        var users = repository.all();
        var dtos = users.stream().map(mapper::toResource);
        return Response.ok(dtos).build();
    }
}
