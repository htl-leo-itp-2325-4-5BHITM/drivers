package at.htl.drive.ride;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class DriveRepository {
    @Inject
    EntityManager em;

    List<Ride> all() {
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

    public void registerForRide(Long id) {
        Ride ride = em.find(Ride.class, id);
        ride.setAvailableSeats(ride.availableSeats -1);
        em.persist(ride);
    }

    public void removeRide(Long id) {
        Ride ride = em.find(Ride.class, id);
        em.remove(ride);
    }

    public void postRide(RideDto rideDto) {
        Ride ride = new Ride(rideDto.departureTime(),rideDto.placeOfDeparture(),rideDto.placeOfArrival(),rideDto.availableSeats(),rideDto.driver());
        em.persist(ride);
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
}
