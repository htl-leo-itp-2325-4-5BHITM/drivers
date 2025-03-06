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
    @Path("/rides/{category}/{username}")
    @GET
    public Response all(@PathParam("category") String category, @PathParam("username") String username) {
        System.out.println("bin im all");
        var rides = repository.all(category, username);
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

    @POST
    @Transactional
    @Path("rides/updateRide")
    public Response updateRide(RideDto rideDto) {
        try {
            repository.updateRide(rideDto);
            return Response.ok("Fahrt erfolgreich aktualisiert.").build();
        } catch (IllegalArgumentException ex) {
            return Response.status(Response.Status.BAD_REQUEST).entity(ex.getMessage()).build();
        }
    }
    @POST
    @Transactional
    @Path("rides/deleteRide")
    public Response deleteRide(Long id) {
        try {
            repository.removeRide(id);
            //repository.sendEmailByDelete(id);
            return Response.ok("Fahrt erfolgreich aktualisiert.").build();
        } catch (IllegalArgumentException ex) {
            return Response.status(Response.Status.BAD_REQUEST).entity(ex.getMessage()).build();
        }
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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    @Path("rides/getFilteredCount")
    public List<RideDto> getFilteredCount(FilterDto filterText) {
        System.out.println("bin im getFilteredRide");
        var rides = repository.getFilteredCount(filterText);
        var dtos = rides.stream().map(rideMapper::toResource).toList();
        return dtos;
    }

    @POST
    @Transactional
    @Path("rides/changeRide")
    public Response changeRide(RideDto rideDto) {
        System.out.println("---------------------------");
        System.out.println(rideDto);
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
    @Path("/bookedSeatCheck")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response isSeatBooked(RegisterRideDto rideDto) {
        try {
            int isBooked = repository.bookedSeatCheck(rideDto); // Aufruf der Repository-Methode
            System.out.println("Booking check result: " + isBooked);
            return Response.ok(isBooked).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception e) {
            return Response.status(Response.Status.FORBIDDEN).entity("Error checking booking status").build();
        }
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
    public Boolean postLogIn(LoginDto user) {
        System.out.println("bin im postLogIn");
        boolean valid = repository.postLogIn(user);
        return valid;
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

    @Path("/rides/getRidesOffered/{username}")
    @POST
    public Long getRidesOffered(@PathParam("username") String username) {
        return repository.getRidesOffered(username);
    }

    @Path("/rides/getOthersRides/{username}")
    @POST
    public Long getOthersRides(@PathParam("username") String username) {
        return repository.getOthersRides(username);
    }

    @Path("/getPassengers/{id}")
    @GET
    public List<DrivUser> getPassengers(@PathParam("id") Long id) {
        return repository.getPassengers(id);
    }

    /*@Path("/users/{username}/upload-image")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Transactional
    public Response changeProfilePicture(@PathParam("username") String username, @MultipartForm FileUploadForm form) {
        return repository.getUserByUsername(username);
    }*/

    @Path("/users/newProfilePicture")
    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response pickProfilePicture(ProfilePictureDto profilePicture) {

        System.out.println("bin im newprofilepic " +profilePicture);
        //System.out.println("test " +profilePicture);
        try {
            repository.pickProfilePicture(profilePicture);
        }
        catch (IllegalArgumentException ex) {
            return Response.status(400, "error").build();
        }
        return Response.ok().build();
    }

    @Path("/rides/rating")
    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response rateRide(RateRideDto rateRide) {
        try {
            repository.rateRide(rateRide);
        }
        catch (IllegalArgumentException ex) {
            return Response.status(400, "error").build();
        }
        return Response.ok().build();
    }
}
