package at.htl.drive.ride;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RideUserAssociationMapper {
    RideUserAssociationDto toResource(RideUserAssociation rUA) {
        return new RideUserAssociationDto(rUA.id, rUA.isDriver);
    }
}
