package at.htl.drive.ride.repository;

import at.htl.drive.ride.dto.RideDto;
import at.htl.drive.ride.model.DrivUser;
import at.htl.drive.ride.model.Ride;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class UserRepository {
    @Inject
    EntityManager em;

    public List<DrivUser> all() {
        return em.createQuery("select d from DrivUser d order by d.lastName", DrivUser.class).getResultList();
    }
}
