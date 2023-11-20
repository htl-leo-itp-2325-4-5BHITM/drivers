package at.htl.drive.ride;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class DriveRepository {
    @Inject
    EntityManager em;

    List<Ride> all() {
        return em.createQuery("select r from Ride r", Ride.class).getResultList();
    }
}