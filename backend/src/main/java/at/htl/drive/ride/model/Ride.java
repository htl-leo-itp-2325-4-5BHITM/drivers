package at.htl.drive.ride.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
public class Ride {

    //<editor-fold desc="Initialize">

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(nullable = false)
    public Timestamp departureTime;
    @Column(length = 100,nullable = false)
    public String placeOfDeparture;

    @Column(length = 100,nullable = false)
    public String placeOfArrival;

    @Column(length = 50,nullable = false)
    public int availableSeats;

    @Column(length = 100,nullable = false)
    public String driver;

    @Column(length = 100,nullable = true)
    public String placeOfDepartureCoordinates;
    @Column(length = 100,nullable = true)
    public String placeOfArrivalCoordinates;

    /*@OneToMany(mappedBy = "ride")
    public List<RideUserAssociation> associationList;*/

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    public DrivUser user;

    // RATING
    @Column(length = 1)
    public Long stars;

    @Column()
    public Long ratingCount;

    /*@OneToMany
    public List<Swipe> swipes;
    //</editor-fold>*/

    //<editor-fold desc="Getter and Setter">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public Timestamp getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Timestamp departureTime) {
        this.departureTime = departureTime;
    }

    public String getPlaceOfDeparture() {
        return placeOfDeparture;
    }

    public void setPlaceOfDeparture(String placeOfDeparture) {
        this.placeOfDeparture = placeOfDeparture;
    }

    public String getPlaceOfArrival() {
        return placeOfArrival;
    }

    public void setPlaceOfArrival(String placeOfArrival) {
        this.placeOfArrival = placeOfArrival;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public String getPlaceOfDepartureCoordinates() {
        return placeOfDepartureCoordinates;
    }

    public Long getStars() {
        return stars;
    }

    public void setStars(Long stars) {
        if(this.stars == null) {
            this.ratingCount = Long.valueOf(0);
            this.stars = Long.valueOf(0);
        }
        this.ratingCount++;
        this.stars += stars;
        //this.stars = this.stars/this.ratingCount;
        this.stars = Math.round((double) this.stars / this.ratingCount);
    }

    public Long getRatingCount() {
        return ratingCount;
    }

    public void setRatingCount(Long ratingCount) {
        this.ratingCount = ratingCount;
    }

    public void setPlaceOfDepartureCoordinates(String placeOfDepartureCoordinates) {
        this.placeOfDepartureCoordinates = placeOfDepartureCoordinates;
    }

    public String getPlaceOfArrivalCoordinates() {
        return placeOfArrivalCoordinates;
    }

    public void setPlaceOfArrivalCoordinates(String placeOfArrivalCoordinates) {
        this.placeOfArrivalCoordinates = placeOfArrivalCoordinates;
    }


    public Ride() {

    }

    public Ride(Timestamp departureTime, String placeOfDeparture, String placeOfArrival, int availableSeats, String driver) {
        this.departureTime = departureTime;
        this.placeOfDeparture = placeOfDeparture;
        this.placeOfArrival = placeOfArrival;
        this.availableSeats = availableSeats;
        this.driver = driver;
    }

    public Ride(Long id, Timestamp departureTime, String placeOfDeparture, String placeOfArrival, int availableSeats, String driver) {
        this.id = id;
        this.departureTime = departureTime;
        this.placeOfDeparture = placeOfDeparture;
        this.placeOfArrival = placeOfArrival;
        this.availableSeats = availableSeats;
        this.driver = driver;
    }

    public Ride(Timestamp departureTime, String placeOfDeparture, String placeOfArrival, int availableSeats, String driver, String placeOfDepartureCoordinates, String placeOfArrivalCoordinates) {
        this.departureTime = departureTime;
        this.placeOfDeparture = placeOfDeparture;
        this.placeOfArrival = placeOfArrival;
        this.availableSeats = availableSeats;
        this.driver = driver;
        this.placeOfDepartureCoordinates = placeOfDepartureCoordinates;
        this.placeOfArrivalCoordinates = placeOfArrivalCoordinates;
    }
}
