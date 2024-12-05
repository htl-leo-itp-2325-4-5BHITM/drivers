package at.htl.drive.ride.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class RideRegister {

    private Long id;

    public RideRegister() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    @Column(nullable = false)
    public Long rideId;

    @Column(nullable = false)
    public String username;

    public RideRegister(Long rideId, String username) {
        this.rideId = rideId;
        this.username = username;
    }
}
