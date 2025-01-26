package at.htl.drive.ride.dto;

public record DrivUserDto(
        String firstName,
        String lastName,
        String phoneNr,
        String emailAddress,
        String username,
        String password,
        String profilePicture)
{
}
