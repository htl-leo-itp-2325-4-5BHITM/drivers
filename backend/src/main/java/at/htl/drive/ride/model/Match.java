package at.htl.drive.ride.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @OneToOne
    @JoinColumn(name = "swipe_id", nullable = false)
    public Swipe swipe;

    @ManyToOne
    @JoinColumn(name = "user_id_1", nullable = false)
    public DrivUser user1;

    @ManyToOne
    @JoinColumn(name = "user_id_2", nullable = false)
    public DrivUser user2;

}
