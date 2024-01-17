package at.htl.drive.ride.repository;

import at.htl.drive.ride.model.DrivUser;
import at.htl.drive.ride.model.Ride;
import at.htl.drive.ride.dto.RideDto;
import at.htl.drive.ride.model.RideUserAssociation;
import at.htl.drive.ride.model.RideUserAssociationId;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

@ApplicationScoped
public class DrivUsRepository {
    @Inject
    EntityManager em;


    //RIDE:

    public List<Ride> all() {
        return em.createQuery("select r from Ride r order by r.departureTime", Ride.class).getResultList();
    }

    public void changeRide(RideDto rideDto) {
        Long id = rideDto.id();
        Ride ride = em.find(Ride.class, id);
        ride.setDepartureTime(rideDto.departureTime());
        ride.setPlaceOfDeparture(rideDto.placeOfDeparture());
        ride.setPlaceOfArrival(rideDto.placeOfArrival());
        ride.setAvailableSeats(rideDto.availableSeats());
        ride.setDriver(rideDto.driver());
        em.persist(ride);
    }

    public void registerForRide(Long id, String username) {
        Ride ride = em.find(Ride.class, id);
        ride.setAvailableSeats(ride.availableSeats -1);
        em.persist(ride);
        DrivUser user = em.find(DrivUser.class, username);

    }

    public void removeRide(Long id) {
        Ride ride = em.find(Ride.class, id);
        em.remove(ride);
    }

    public void postRide(RideDto rideDto) {
        Ride ride = new Ride(rideDto.departureTime(),rideDto.placeOfDeparture(),rideDto.placeOfArrival(),rideDto.availableSeats(),rideDto.driver());
        em.persist(ride);
        RideUserAssociationId id = new RideUserAssociationId(ride.id, 1L);
        RideUserAssociation rua = new RideUserAssociation(id, true);
        em.persist(rua);
    }

    public Ride getRide(Long id) {
        Ride ride = em.find(Ride.class, id);
        return ride;
    }

    public List<Ride> getSortedRide(Boolean sortedWay, String column) {
        if (sortedWay) {
            return em.createQuery("from Ride order by " + column + " asc", Ride.class).getResultList();
        } else {
            return em.createQuery("from Ride order by " + column + " desc", Ride.class).getResultList();
        }
    }


    // USER:

    public List<DrivUser> allUsers() {
        return em.createQuery("select d from DrivUser d order by d.lastName", DrivUser.class).getResultList();
    }


    public List<DrivUser> getDriverofNew() {
        /*
        select id, emailaddress, firstname, lastname, phonenr from rideuserassociation rua
        join drivuser u on u.id = rua.userid
        where rideid >= ALL (select rideid from rideuserassociation);
         */

        String sql = "select u.id, u.emailAddress, u.firstName, u.lastName, u.phoneNr " +
                "from RideUserAssociation rua " +
                "join rua.user u " +
                "where rua.ride.id >= ALL (select rua.ride.id from RideUserAssociation) ";

        TypedQuery<DrivUser> query = em.createQuery(sql, DrivUser.class);
        return query.getResultList();
    }
}
