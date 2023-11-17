package at.htl.drive.ride;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Path("/rides")
public class DriversResource {
    @GET
    public Response all() {
        var ride = new Ride();
        ride.driver = "Joe Sixpack";
        ride.departureTime = new Timestamp(System.currentTimeMillis());
        ride.placeOfDeparture = "Loop Street 1";
        ride.id = 17L;
        return Response.ok(ride).build();
    }

}
