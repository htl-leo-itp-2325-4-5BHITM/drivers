package at.htl.drive.ride.dto;

import jakarta.persistence.Column;

import java.sql.Timestamp;

public record FilterDto(
        Timestamp departureTime,
        String placeOfDeparture,
        String placeOfArrival
) {
}
