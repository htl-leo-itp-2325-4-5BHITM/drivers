package at.htl.drive.ride;

public record UserDto(
        Long id,
        String firstName,
        String lastName,
        String phoneNr,
        String emailAddress
)
{
}
