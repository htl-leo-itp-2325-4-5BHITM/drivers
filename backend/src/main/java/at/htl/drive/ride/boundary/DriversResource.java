package at.htl.drive.ride.boundary;

import at.htl.drive.ride.model.Ride;
import at.htl.drive.ride.dto.RideDto;
import at.htl.drive.ride.RideMapper;
import at.htl.drive.ride.repository.DriveRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("/rides")
public class DriversResource {
    @Inject
    DriveRepository repository;
    @Inject
    RideMapper rideMapper;
    @GET
    public Response all() {
        System.out.println("bin im all");
        var rides = repository.all();
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }

    @GET
    @Path("/getRide/{id}")
    public Ride getRide(@PathParam("id") Long id) {
        System.out.println("bin im getRide");
        var ride = repository.getRide(id);
        return ride;
    }

    @GET
    @Path("/getSortedRide/{sortedWay}/{column}")
    public Response getSortedRide(@PathParam("sortedWay") Boolean sortedWay, @PathParam("column") String column) {
        System.out.println("bin im getSortedRide");
        var rides = repository.getSortedRide(sortedWay,column);
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }

    @POST
    @Transactional
    @Path("/changeRide")
    public Response changeRide(RideDto rideDto) {
        repository.changeRide(rideDto);
        return Response.ok().build();
    }

    @POST
    @Transactional
    @Path("/registerForRide")
    public Response registerForRide(Long id) {
        repository.registerForRide(id);
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

    @POST
    @Transactional
    @Path("/removeRide")
    public Response removeRide(Long id) {
        repository.removeRide(id);
        return Response.ok().build();
    }
}
