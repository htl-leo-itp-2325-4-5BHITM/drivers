package at.htl.drive.ride.boundary;

import at.htl.drive.ride.DrivUserMapper;
import at.htl.drive.ride.dto.*;
import at.htl.drive.ride.model.DrivUser;
import at.htl.drive.ride.model.Ride;
import at.htl.drive.ride.RideMapper;
import at.htl.drive.ride.model.RideRegister;
import at.htl.drive.ride.repository.DrivUsRepository;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;
import org.jose4j.json.internal.json_simple.JSONObject;
import org.keycloak.authorization.client.AuthzClient;

import java.util.LinkedList;
import java.util.List;


@Path("/drivus")
public class DrivUsResource {

    @Inject
    Logger log;
    @Inject
    JsonWebToken jwt;
    @Inject
    DrivUsRepository repository;
    @Inject
    RideMapper rideMapper;
    @Inject
    DrivUserMapper userMapper;

    @GET
    public Response start() {
        System.out.println("start");
        //repository.getAllRidesLoader();
        return Response.ok().build();
    }

    @PermitAll
    @Path("/rides")
    @GET
    public Response all() {
        System.out.println("bin im all");
        var rides = repository.all();
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }

    @Path("/user/detail")
    @GET
    public JSONObject dumpWebToken() {
        log.infof("email=%s", jwt.claim(Claims.email));
        String firstName = jwt.claim(Claims.given_name).get().toString();
        String lastName = jwt.claim(Claims.family_name).get().toString();
        String email = jwt.claim(Claims.email).get().toString();

        log.infof("firstName=%s", firstName);
        //List<String> userDetails = new LinkedList<>();
        //userDetails.add(name);
        //userDetails.add(email);

        JSONObject userDetails = new JSONObject();
        userDetails.put("firstName", firstName);
        userDetails.put("lastName", lastName);
        userDetails.put("email", email);

        return userDetails;
    }

    @Path("/rides/getCount")
    @GET
    public Long getRidesCount() {
        return repository.getRidesCount();
    }

    /*@GET
    @Path("/pagination/{page}{ridesPerPage}")
    public Response pagination(@PathParam("page") int page, @PathParam("ridesPerPage") int ridesPerPage) {
        System.out.println("in pagination");
        var rides = repository.pagination(page, ridesPerPage);
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }*/

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
        int page = 1;
        var rides = repository.getSortedRide(sortedWay,column, page);
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }

    @GET
    @Path("rides/getFilteredRide/{filterText}{page}")
    public Response getFilteredRide(@PathParam("filterText") String filterText, @PathParam("page") int page) {
        System.out.println("bin im getFilteredRide");
        var rides = repository.getFilteredRides(filterText, page);
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }

    @GET
    @Path("rides/getFilteredCount/{filterText}")
    public Long getFilteredCount(@PathParam("filterText") String filterText) {
        System.out.println("bin im getFilteredRide");
        return repository.getFilteredCount(filterText);
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
    public List<RideRegister> registerForRide(RegisterRideDto ruaDto) {
        return repository.registerForRide(ruaDto);
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

    @Path("rides/getUserThrewRideId")
    @POST
    public DrivUser getUserThrewRideId(int id) {
        return repository.getUserThrewRideId(id);
    }

    @Path("/users")
    @GET
    public Response allUsers() {
        System.out.println("bin im all");
        var users = repository.allUsers();
        var dtos = users.stream().map(userMapper::toResource);
        return Response.ok(dtos).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/users/postUser")
    public Response postUser(DrivUserDto user) {
        System.out.println("bin im postUser");
        try {
            repository.postUser(user);
        }
        catch (IllegalArgumentException ex) {
            return Response.status(400, "User already exists").build();
        }
        return Response.ok().build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/users/postLogIn")
    public Response postLogIn(LoginDto user) {
        System.out.println("bin im postLogIn");
        try {
            boolean valid = true;
            valid = repository.postLogIn(user);
            return Response.ok(valid).build();
        }
        catch (IllegalArgumentException ex) {
            return Response.status(400, "User already exists").build();
        }
    }

    @Path("/getDriverOfNew")
    @GET
    public List<DrivUser> getDriverOfNew() {
        return repository.getDriverofNew();
    }

    @Path("/getUser")
    @POST
    public DrivUser getUser(UsernameDto username) {
        return repository.getUser(username);
    }

    @Path("/getUserByUsername")
    @POST
    public DrivUser getUserByUsername(UsernameDto username) {
        return repository.getUserByUsername(username);
    }

   /* @Path("/rides/getAllRides/javaFaker")
    @GET
    @Transactional
    public List<Ride> dataLoaderToDatabase() {
        return repository.getAllRidesLoader();
    }*/
    /*
    @Path("/rides")
    @GET
    public Response all() {
        System.out.println("bin im all");
        var rides = repository.all();
        var dtos = rides.stream().map(rideMapper::toResource);
        return Response.ok(dtos).build();
    }*/
}
