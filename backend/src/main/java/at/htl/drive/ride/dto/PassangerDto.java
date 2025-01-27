package at.htl.drive.ride.dto;

public record PassangerDto(
        Long id,
        String firstName,
        String lastName,
        String phoneNr,
        String emailAddress,
        String username
) {
}
