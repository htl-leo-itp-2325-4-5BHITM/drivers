package at.htl.drive.ride.dto;

public record DrivUserDto(
        Long id,
        String firstName,
        String lastName,
        String phoneNr,
        String emailAddress,
        String username
)
{
}
