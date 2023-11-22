package at.htl.drive.ride;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
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
        System.out.println("bin im all");
        var rides = repository.all();
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }

    @POST
    public Response changeRide(Long id) {
        repository.changeRide(id);
        return Response.ok().build();
    }

    @POST
    @Transactional
    @Path("/postRide")
    public Response postRide(RideDto rideDto) {
        System.out.println("bin im Ressource");
        repository.postRide(rideDto);
        return Response.ok().build();
    }
}
