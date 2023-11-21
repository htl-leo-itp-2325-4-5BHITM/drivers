package at.htl.drive.ride;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RideMapper {
    RideDto toResource(Ride ride) {
        return new RideDto(ride.id,ride.departureTime,ride.placeOfDeparture,ride.placeOfArrival,ride.availableSeats,ride.driver);
    }
}
