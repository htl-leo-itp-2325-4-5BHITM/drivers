package at.htl.drive.ride;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(nullable = false)
    public String driver;
    @Column(nullable = false)
    public Timestamp departureTime;
    @Column(nullable = false)
    public String placeOfDeparture;
}
