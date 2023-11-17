package at.htl.drive.ride;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Path("/rides")
public class DriversResource {
    @Inject
    DriveRepository repository;
    @Inject RideMapper rideMapper;
    @GET
    public Response all() {
        var rides = repository.all();
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }
}
