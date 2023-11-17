package at.htl.drive.ride;

import jakarta.persistence.Column;

import java.sql.Timestamp;

public record RideDto(
    Long id,
    String driver,
    Timestamp departureTime,
    String placeOfDeparture
)
{
}
