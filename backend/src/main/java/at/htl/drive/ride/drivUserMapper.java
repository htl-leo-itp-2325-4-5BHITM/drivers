package at.htl.drive.ride;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class drivUserMapper {
    drivUserDto toResource(drivUser user) {
        return new drivUserDto(user.id, user.firstName, user.lastName, user.phoneNr, user.emailAddress);
    }
}
