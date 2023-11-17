package at.htl.drive.ride;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RideMapper {
    RideDto toResource(Ride ride) {
        return new RideDto(ride.id, ride.driver, ride.departureTime, ride.placeOfDeparture);
    }
}
