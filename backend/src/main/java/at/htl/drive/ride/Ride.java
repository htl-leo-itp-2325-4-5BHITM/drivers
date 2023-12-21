package at.htl.drive.ride;

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

    /*@OneToMany(mappedBy = "ride")
    public List<RideUserAssociation> associationList;*/

    //</editor-fold>

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
}
