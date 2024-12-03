package at.htl.drive.ride;

import at.htl.drive.ride.dto.DrivUserDto;
import at.htl.drive.ride.model.DrivUser;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DrivUserMapper {
    public DrivUserDto toResource(DrivUser user) {
        return new DrivUserDto(user.firstName, user.lastName, user.phoneNr, user.emailAddress, user.username,user.password);
    }
}
