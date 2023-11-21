package at.htl.drive.ride;

import jakarta.persistence.Column;

import java.sql.Timestamp;

public record RideDto(
    Long id,
    Timestamp departureTime,
    String placeOfDeparture,
    String placeOfArrival,
    int availableSeats,
    String driver

)
{
}
