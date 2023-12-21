package at.htl.drive.ride;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserMapper {
    UserDto toResource(User user) {
        return new UserDto(user.id, user.firstName, user.lastName, user.phoneNr, user.emailAddress);
    }
}
