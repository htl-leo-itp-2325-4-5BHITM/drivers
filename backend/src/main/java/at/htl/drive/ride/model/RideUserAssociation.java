package at.htl.drive.ride.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

@Entity
public class RideUserAssociation {

    @EmbeddedId
    public RideUserAssociationId id;
    public boolean isDriver;

    /*@ManyToOne
    Ride ride;

    @ManyToOne
    User user;*/

    public RideUserAssociationId getId() {
        return id;
    }

    public void setId(RideUserAssociationId id) {
        this.id = id;
    }

    public boolean isDriver() {
        return isDriver;
    }

    public void setDriver(boolean driver) {
        isDriver = driver;
    }

    public RideUserAssociation(RideUserAssociationId id, boolean isDriver) {
        this.id = id;
        this.isDriver = isDriver;
    }

    public RideUserAssociation() {
    }
}
