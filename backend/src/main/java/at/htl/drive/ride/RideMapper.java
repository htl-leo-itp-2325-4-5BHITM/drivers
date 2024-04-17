package at.htl.drive.ride;

import at.htl.drive.ride.dto.DrivUserDto;
import at.htl.drive.ride.dto.RideDto;
import at.htl.drive.ride.model.DrivUser;
import at.htl.drive.ride.model.Ride;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RideMapper {
    public RideDto toResource(Ride ride) {
        return new RideDto(ride.id,ride.departureTime,ride.placeOfDeparture,ride.placeOfArrival,ride.availableSeats,ride.driver,ride.placeOfDepartureCoordinates,ride.placeOfArrivalCoordinates);
    }
}
