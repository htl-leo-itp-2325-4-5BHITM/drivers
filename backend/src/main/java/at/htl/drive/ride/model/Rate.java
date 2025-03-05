package at.htl.drive.ride.model;

import jakarta.persistence.*;

@Entity
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = false)
    public Long rideId;


    // RATING
    @Column(length = 1)
    public Long stars;


    public Rate(Long rideId, Long stars) {
        this.rideId = rideId;
        this.setStars(stars);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRideId() {
        return rideId;
    }

    public void setRideId(Long rideId) {
        this.rideId = rideId;
    }

    public Long getStars() {
        return stars;
    }

    public void setStars(Long stars) {
        this.stars = stars;
    }

    public Rate() {
    }
}
