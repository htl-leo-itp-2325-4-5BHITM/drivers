package at.htl.drive.ride.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
public class Swipe {

    //<editor-fold desc="Initialize">

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @ManyToOne
    @JoinColumn(name = "user_id_1", nullable = false)
    public DrivUser firstUser;

    @ManyToOne
    @JoinColumn(name = "user_id_2", nullable = false)
    public DrivUser secondUser;

    @Column(nullable = false)
    public boolean firstAnswer;

    @Column(nullable = false)
    public boolean secondAnswer;

    @OneToOne(mappedBy = "swipe", cascade = CascadeType.ALL, orphanRemoval = true)
    public Match match;

    //</editor-fold>

    //<editor-fold desc="Getter and Setter">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    /*public String getDriver() {
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

    public void setPlaceOfDepartureCoordinates(String placeOfDepartureCoordinates) {
        this.placeOfDepartureCoordinates = placeOfDepartureCoordinates;
    }

    public String getPlaceOfArrivalCoordinates() {
        return placeOfArrivalCoordinates;
    }

    public void setPlaceOfArrivalCoordinates(String placeOfArrivalCoordinates) {
        this.placeOfArrivalCoordinates = placeOfArrivalCoordinates;
    }

    //</editor-fold>

    public Ride() {

    }

    public Ride(Timestamp departureTime, String placeOfDeparture, String placeOfArrival, int availableSeats, String driver) {
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
    }*/
}

