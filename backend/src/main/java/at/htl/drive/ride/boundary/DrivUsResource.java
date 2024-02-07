package at.htl.drive.ride.boundary;

import at.htl.drive.ride.DrivUserMapper;
import at.htl.drive.ride.dto.RegisterRideDto;
import at.htl.drive.ride.dto.UsernameDto;
import at.htl.drive.ride.model.DrivUser;
import at.htl.drive.ride.model.Ride;
import at.htl.drive.ride.dto.RideDto;
import at.htl.drive.ride.RideMapper;
import at.htl.drive.ride.repository.DrivUsRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/drivus")
public class DrivUsResource {
    @Inject
    DrivUsRepository repository;
    @Inject
    RideMapper rideMapper;
    @Inject
    DrivUserMapper userMapper;

    @Path("/rides")
    @GET
    public Response all() {
        System.out.println("bin im all");
        var rides = repository.all();
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }

    @GET
    @Path("rides/getRide/{id}")
    public Ride getRide(@PathParam("id") Long id) {
        System.out.println("bin im getRide");
        var ride = repository.getRide(id);
        return ride;
    }

    @GET
    @Path("rides/getSortedRide/{sortedWay}/{column}")
    public Response getSortedRide(@PathParam("sortedWay") Boolean sortedWay, @PathParam("column") String column) {
        System.out.println("bin im getSortedRide");
        var rides = repository.getSortedRide(sortedWay,column);
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }

    @GET
    @Path("rides/getFilteredRide/{filterText}")
    public Response getFilteredRide(@PathParam("filterText") String filterText) {
        System.out.println("bin im getFilteredRide");
        var rides = repository.getFilteredRides(filterText);
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }

    @POST
    @Transactional
    @Path("rides/changeRide")
    public Response changeRide(RideDto rideDto) {
        repository.changeRide(rideDto);
        return Response.ok().build();
    }

    @POST
    @Transactional
    @Path("rides/registerForRide")
    public Response registerForRide(RegisterRideDto ruaDto) {
        repository.registerForRide(ruaDto);
        return Response.ok().build();
    }

    @POST
    @Transactional
    @Path("rides/unregisterForRide")
    public Response unregisterForRide(RegisterRideDto ruaDto) {
        repository.unregisterForRide(ruaDto);
        return Response.ok().build();
    }

    @POST
    @Transactional
    @Path("rides/postRide")
    public Response postRide(RideDto rideDto) {
        System.out.println("bin im Ressource");
        repository.postRide(rideDto);
        return Response.ok().build();
    }

    @POST
    @Transactional
    @Path("rides/removeRide")
    public Response removeRide(Long id) {
        repository.removeRide(id);
        return Response.ok().build();
    }

    @Path("/users")
    @GET
    public Response allUsers() {
        System.out.println("bin im all");
        var users = repository.allUsers();
        var dtos = users.stream().map(userMapper::toResource);
        return Response.ok(dtos).build();
    }

    @Path("/getDriverOfNew")
    @GET
    public List<DrivUser> getDriverOfNew() {
        return repository.getDriverofNew();
    }

    @Path("/getUser")
    @GET
    public DrivUser getUser(UsernameDto username) {
        return repository.getUser(username);
    }

}
