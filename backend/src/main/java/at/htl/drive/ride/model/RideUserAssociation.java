package at.htl.drive.ride.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class RideUserAssociation {

    @EmbeddedId
    public RideUserAssociationId id;
    public boolean isDriver;

    @ManyToOne
    Ride ride;

    @ManyToOne
    @JoinColumn(name = "USERID", referencedColumnName = "ID", nullable = false)
    DrivUser user;

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
