package at.htl.drive.ride.repository;

import at.htl.drive.ride.dto.*;
import at.htl.drive.ride.model.DrivUser;
import at.htl.drive.ride.model.Rate;
import at.htl.drive.ride.model.Ride;
//import at.htl.drive.ride.model.RideUserAssociation;
//import at.htl.drive.ride.model.RideUserAssociationId;
import at.htl.drive.ride.model.RideRegister;
import com.github.javafaker.Faker;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.quarkus.mailer.reactive.ReactiveMailer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import static io.quarkus.hibernate.orm.panache.PanacheEntityBase.findById;

@ApplicationScoped
public class DrivUsRepository {
    @Inject
    EntityManager em;

    @Inject
    Mailer mailer;

    @Inject
    ReactiveMailer reactiveMailer;

    public void sendEmailByDelete(Ride ride) {
        List<DrivUser> passengers = getPassengers(ride.id);

        if (ride == null ) {
            System.out.println("Fahrt nicht gefunden.");

        }
        if (passengers == null && passengers.isEmpty()) {
            System.out.println("Passagiere nicht gefunden ist empty.");

        }

        for (DrivUser passenger : passengers) {
            String email = passenger.getEmailAddress();
            if (email != null && !email.isEmpty()) {
                String subject = "Ride cancelled";
                String body = String.format(
                        "Dear %s %s\n\n" +
                                "Your ride from %s to %s has been deleted.\n" +
                                "Date and Time: %s\n\n",
                        passenger.getFirstName(),
                        passenger.getLastName(),
                        ride.getPlaceOfDeparture(), // Startort der Fahrt
                        ride.getPlaceOfArrival(),   // Zielort der Fahrt
                        ride.getDepartureTime()     // Datum und Uhrzeit der Fahrt
                );

                try {
                    mailer.send(Mail.withText(email, subject, body)
                            .setFrom("drivus.carpool@gmail.com"));
                } catch (Exception e) {
                    System.out.println("Fehler beim Senden der E-Mail an: " + email);
                    e.printStackTrace();
                }
            }
        }
    }

    public void sendEmailByBook(RegisterRideDto rideBooked) {
        long rideId = rideBooked.rideId();
        Ride ride = em.find(Ride.class, rideId);

        if (ride == null) {
            System.out.println("Fahrt nicht gefunden.");
            return;
        }

        TypedQuery<DrivUser> query = em.createQuery("SELECT d FROM DrivUser d WHERE d.username = :username", DrivUser.class);
        query.setParameter("username", ride.getDriver());
        List<DrivUser> drivers = query.getResultList();

        if (drivers.isEmpty()) {
            System.out.println("Driver nicht gefunden.");
            return;
        }

        DrivUser driver = drivers.get(0);

        String email = driver.getEmailAddress();
        if (email != null && !email.isEmpty()) {
            String subject = "Your ride got booked";
            String body = String.format(
                    "Dear %s %s,\n\n" +
                            "Your ride from %s to %s " +
                            "on the %s. \n" +
                            "has been booked by %s.\n",
                    driver.getFirstName(),
                    driver.getLastName(),
                    ride.getPlaceOfDeparture(),
                    ride.getPlaceOfArrival(),
                    ride.getDepartureTime(),
                    rideBooked.username()
            );

            try {
                mailer.send(Mail.withText(email, subject, body)
                        .setFrom("drivus.carpool@gmail.com"));
            } catch (Exception e) {
                System.out.println("Fehler beim Senden der E-Mail an: " + email);
                e.printStackTrace();
            }
        }
    }


    public void sendEmailByUnBook(RegisterRideDto rideUnbooked) {
        long rideId = rideUnbooked.rideId();
        Ride ride = em.find(Ride.class, rideId);

        if (ride == null) {
            System.out.println("Fahrt nicht gefunden.");
            return;
        }

        TypedQuery<DrivUser> query = em.createQuery("SELECT d FROM DrivUser d WHERE d.username = :username", DrivUser.class);
        query.setParameter("username", ride.getDriver());
        List<DrivUser> drivers = query.getResultList();

        if (drivers.isEmpty()) {
            System.out.println("Driver nicht gefunden.");
            return;
        }

        DrivUser driver = drivers.get(0);

        String email = driver.getEmailAddress();
        if (email != null && !email.isEmpty()) {
            String subject = "Your ride got unbooked";
            String body = String.format(
                    "Dear %s %s,\n\n" +
                            "Your ride from %s to %s " +
                            "on the %s. \n" +
                            "has been unbooked by %s.\n",
                    driver.getFirstName(),
                    driver.getLastName(),
                    ride.getPlaceOfDeparture(),
                    ride.getPlaceOfArrival(),
                    ride.getDepartureTime(),
                    rideUnbooked.username()
            );

            try {
                mailer.send(Mail.withText(email, subject, body)
                        .setFrom("drivus.carpool@gmail.com"));
            } catch (Exception e) {
                System.out.println("Fehler beim Senden der E-Mail an: " + email);
                e.printStackTrace();
            }
        }

    }


    public List<Ride> all(String category, String username) {
        if(username.equals("none")) {
            return em.createQuery("select r from Ride r order by r.departureTime", Ride.class).getResultList();
        }

        switch (category) {
            case "available":
                Query query = em.createQuery("SELECT r FROM Ride r " +
                                "WHERE r.driver <> :username and r.departureTime > :currentDateTime " +
                                "AND r.id NOT IN (" +
                                "    SELECT rr.rideId FROM RideRegister rr WHERE rr.username = :username" +
                                ") " +
                                "ORDER BY r.departureTime",
                        Ride.class);
                /*Query query = em.createQuery("SELECT r FROM Ride r " +
                        "WHERE r.driver <> :username and r.departureTime > :currentDateTime " +
                                "AND r.id NOT IN (" +
                                "    SELECT rr.rideId FROM RideRegister rr WHERE rr.username = :username" +
                                ") " +
                                "ORDER BY r.departureTime",
                        Ride.class);*/
                query.setParameter("username", username);
                //query.setParameter("currentDateTime", LocalDateTime.now());
                query.setParameter("currentDateTime", LocalDateTime.now());
                return query.getResultList();
            case "offered":
                Query query1 = em.createQuery("select r from Ride r where r.driver = :username order by r.departureTime", Ride.class);
                query1.setParameter("username", username);
                return query1.getResultList();
            case "booked":
                Query query2 = em.createQuery("select r " +
                        "from RideRegister rr join Ride r on rr.rideId = r.id " +
                        "where rr.username = :username and r.departureTime > :currentDateTime", Ride.class);
                query2.setParameter("username", username);
                query2.setParameter("currentDateTime", LocalDateTime.now());
                return query2.getResultList();
            case "ranking":
                Query query3 = em.createQuery("select r " +
                        "from RideRegister rr join Ride r on rr.rideId = r.id " +
                        "where rr.username = :username and r.departureTime < :currentDateTime", Ride.class);
                query3.setParameter("username", username);
                query3.setParameter("currentDateTime", LocalDateTime.now());
                return query3.getResultList();
            default:
                return em.createQuery("select r from Ride r order by r.departureTime", Ride.class).getResultList();

            //return em.createQuery("select r from Ride r order by r.departureTime", Ride.class).getResultList();
        }
    }

    public Long getRidesCount() {
        String sql = "select count(r) from Ride r";
        TypedQuery<Long> query = em.createQuery(sql, Long.class);
        return query.getSingleResult();
    }

    public void changeRide(RideDto rideDto) {

        Long id = rideDto.id();
        Ride ride = em.find(Ride.class, id);

        if (rideDto.departureTime() != null){
            ride.setDepartureTime(rideDto.departureTime());
        }

        //ride.setDepartureTime(rideDto.departureTime());
        ride.setPlaceOfDeparture(rideDto.placeOfDeparture());
        ride.setPlaceOfArrival(rideDto.placeOfArrival());
        ride.setAvailableSeats(rideDto.availableSeats());
        ride.setDriver(rideDto.driver());
        em.merge(ride);
    }

    @Transactional
    public void updateRide(RideDto rideDto) {

        Ride ride = em.find(Ride.class, rideDto.id());

        if (ride == null) {
            throw new IllegalArgumentException("Fahrt mit der angegebenen ID existiert nicht.");
        }

        ride.setDepartureTime(rideDto.departureTime());
        ride.setDriver(rideDto.driver());
        ride.setPlaceOfArrivalCoordinates(rideDto.placeOfArrival());
        ride.setPlaceOfDepartureCoordinates(rideDto.placeOfDeparture());
        ride.setPlaceOfArrival(rideDto.placeOfArrival());
        ride.setPlaceOfDeparture(rideDto.placeOfDeparture());
        ride.setAvailableSeats(rideDto.availableSeats());
        ride.setDepartureTime(rideDto.departureTime());
        em.merge(ride);
        
    }



    public int bookedSeatCheck(RegisterRideDto ruaDto) {
        String jpql = "SELECT COUNT(r) FROM RideRegister r WHERE r.rideId = :id and r.username = :username";
        TypedQuery<Long> query = em.createQuery(jpql, Long.class);
        query.setParameter("id", ruaDto.rideId());
        query.setParameter("username", ruaDto.username());

        Long count = query.getSingleResult(); // Holt das Ergebnis der COUNT-Abfrage
        return count.intValue(); // Konvertiert Long in int und gibt es zurück
    }


    public List<RideRegister> registerForRide(RegisterRideDto ruaDto) {
        String jpql = "SELECT COUNT(r) FROM RideRegister r WHERE r.rideId = :id and r.username = :username";
        TypedQuery<Long> query = em.createQuery(jpql, Long.class);
        query.setParameter("id", ruaDto.rideId());
        query.setParameter("username", ruaDto.username());
        Long count = query.getSingleResult();

        if(count == 0) {
            Long id = ruaDto.rideId();
            System.out.println(id);
            Ride ride = em.find(Ride.class, ruaDto.rideId());
            ride.setAvailableSeats(ride.availableSeats -1);
            em.persist(ride);

            RideRegister rideRegister = new RideRegister(ruaDto.rideId(), ruaDto.username());
            em.persist(rideRegister);
            sendEmailByBook(ruaDto);
        }
        /*else {
            RideRegister rideRegister = new RideRegister(ruaDto.rideId(), ruaDto.username());
            em.remove(rideRegister);
        }*/

        return em.createQuery("select r from RideRegister r", RideRegister.class).getResultList();

        /*String[] name = ruaDto.username().split(" ");
        String sql = "select d from DrivUser d " +
                "where d.firstName = '" + name[0] + "' and d.lastName = '" + name[1] + "'";
        TypedQuery<DrivUser> query = em.createQuery(sql, DrivUser.class);
        List<DrivUser> user = query.getResultList();
        Long userId = user.get(0).getId();
        System.out.println(userId);

        RideUserAssociationId ruaId = new RideUserAssociationId(ride.id, userId);
        RideUserAssociation rua = new RideUserAssociation(ruaId, false);
        em.persist(rua);*/
    }

    public void unregisterForRide(RegisterRideDto ruaDto) {
        Long id = ruaDto.rideId();
        System.out.println(id);
        Ride ride = em.find(Ride.class, ruaDto.rideId());
        ride.setAvailableSeats(ride.availableSeats +1);
        em.persist(ride);

        String jpql = "SELECT r.id FROM RideRegister r WHERE r.rideId = :id and r.username = :username";
        TypedQuery<Long> query = em.createQuery(jpql, Long.class);
        query.setParameter("id", ruaDto.rideId());
        query.setParameter("username", ruaDto.username());

        Ride rideForEmail = ride;

        if(query.getResultList().size() == 0) {
            //registerForRide(ruaDto);
        }
        else {
            RideRegister rideRegister = em.find(RideRegister.class, query.getSingleResult());
            em.remove(rideRegister);

        }
        sendEmailByUnBook(ruaDto);

        /*String[] name = ruaDto.username().split(" ");
        String sql = "select d from DrivUser d " +
                "where d.firstName = '" + name[0] + "' and d.lastName = '" + name[1] + "'";
        TypedQuery<DrivUser> query = em.createQuery(sql, DrivUser.class);
        List<DrivUser> user = query.getResultList();
        Long userId = user.get(0).getId();
        System.out.println(userId);

        RideUserAssociationId ruaId = new RideUserAssociationId(ride.id, userId);
        RideUserAssociation rua = new RideUserAssociation(ruaId, false);
        em.remove(em.contains(rua) ? rua : em.merge(rua));*/

        //em.remove(rua);
    }

    @Transactional
    public void removeRide(Long id) {
        System.out.println("Versuche, Ride mit ID " + id + " zu entfernen.");

        // Prüfen, ob ein Ride mit der gegebenen ID existiert
        Ride ride = em.find(Ride.class, id);
        Ride rideForEmail = ride;

        if (ride != null) {
            // Wenn das Ride existiert, entferne es
            em.remove(ride);
            sendEmailByDelete(rideForEmail);
            System.out.println("Ride mit ID " + id + " erfolgreich entfernt.");
        } else {
            // Wenn das Ride nicht existiert, Ausgabe einer Fehlermeldung
            System.out.println("Ride mit ID " + id + " wurde nicht gefunden.");
            throw new IllegalArgumentException("Ride mit der ID " + id + " existiert nicht.");
        }
    }

    public void postRide(RideDto rideDto) {
        Ride ride = new Ride(rideDto.departureTime(),rideDto.placeOfDeparture(),rideDto.placeOfArrival(),rideDto.availableSeats(), rideDto.driver(),rideDto.placeOfDepartureCoordinate(),rideDto.placeOfArrivalCoordinate());
        em.persist(ride);
        /*RideUserAssociationId id = new RideUserAssociationId(ride.id, 1L);
        RideUserAssociation rua = new RideUserAssociation(id, true);
        em.persist(rua);*/
    }

    public Ride getRide(Long id) {
        Ride ride = em.find(Ride.class, id);
        return ride;
    }

    public List<Ride> getSortedRide(Boolean sortedWay, String column, int page) {
        if (sortedWay) {
            TypedQuery<Ride> query = em.createQuery("from Ride order by " + column + " asc", Ride.class);
            try {
                return query.getResultList().subList((page-1)+6*(page-1), ((page-1)+6*(page-1))+7);
            } catch (IndexOutOfBoundsException ex) {
                return query.getResultList().subList((page-1)+6*(page-1), query.getResultList().size());
            }
        } else {
            TypedQuery<Ride> query = em.createQuery("from Ride order by " + column + " desc", Ride.class);
            try {
                return query.getResultList().subList((page-1)+6*(page-1), ((page-1)+6*(page-1))+7);
            } catch (IndexOutOfBoundsException ex) {
                return query.getResultList().subList((page-1)+6*(page-1), query.getResultList().size());
            }
        }
    }


    // USER:

    public List<DrivUser> allUsers() {
        return em.createQuery("select d from DrivUser d order by d.lastName", DrivUser.class).getResultList();
    }

    public void postUser(DrivUserDto user) {
        //check if already exist
        String jpql = "SELECT COUNT(u) FROM DrivUser u WHERE u.emailAddress = :email or u.username = :username";
        TypedQuery<Long> query = em.createQuery(jpql, Long.class);
        query.setParameter("email", user.emailAddress());
        query.setParameter("username", user.username());
        Long count = query.getSingleResult();

        if(count > 0) {
            throw new IllegalArgumentException();
        }

        DrivUser newUser = new DrivUser(user.firstName(), user.lastName(), user.phoneNr(), user.emailAddress(), user.username(), user.password());
        em.persist(newUser);
    }

    public boolean postLogIn(LoginDto user) {
        // JPQL-Abfrage zum Abrufen des Benutzers mit dem angegebenen Benutzernamen oder E-Mail-Adresse und Passwort
        String jpql = "SELECT u FROM DrivUser u WHERE (u.username = :username) AND u.password = :password";
        TypedQuery<DrivUser> query = em.createQuery(jpql, DrivUser.class);
        query.setParameter("username", user.username());
        query.setParameter("password", user.password());

        List<DrivUser> result = query.getResultList();

        // Überprüfe, ob genau ein Benutzer gefunden wurde
        if (result.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }


    public List<DrivUser> getDriverofNew() {
        /*
        select id, emailaddress, firstname, lastname, phonenr from rideuserassociation rua
        join drivuser u on u.id = rua.userid
        where rideid >= ALL (select rideid from rideuserassociation);
         */

        /*String sql = "select u.id, u.emailAddress, u.firstName, u.lastName, u.phoneNr " +
                "from RideUserAssociation rua " +
                "join rua.user u " +
                "where rua.ride.id >= ALL (select rua.ride.id from RideUserAssociation) ";*/

        //TypedQuery<DrivUser> query = em.createQuery(sql, DrivUser.class);
        //return query.getResultList();
        return null;
    }

    public DrivUser getUser(UsernameDto username) {
        String[] name = username.username().split(" ");
        String sql = "select d from DrivUser d " +
                "where d.firstName = '" + name[0] + "' and d.lastName = '" + name[1] + "'";
        TypedQuery<DrivUser> query = em.createQuery(sql, DrivUser.class);
        List<DrivUser> user = query.getResultList();
        Long userId = user.get(0).getId();
        DrivUser drivUser = em.find(DrivUser.class, userId);
        return drivUser;
    }

    public DrivUser getUserByUsername(UsernameDto username) {
        String name = username.username();
        String sql = "select d from DrivUser d " +
                "where d.username = '" + name + "'";
        TypedQuery<DrivUser> query = em.createQuery(sql, DrivUser.class);
        List<DrivUser> user = query.getResultList();
        Long userId = user.get(0).getId();
        DrivUser drivUser = em.find(DrivUser.class, userId);
        return drivUser;
    }

    public List<Ride> getFilteredRides(String filterText, int page) {
        String upperFilterText = "%" + filterText.toUpperCase() + "%";
        String sql = "SELECT DISTINCT r FROM Ride r " +
                "WHERE UPPER(r.placeOfDeparture) LIKE :filterText " +
                "OR UPPER(r.placeOfArrival) LIKE :filterText " +
                "OR UPPER(r.driver) LIKE :filterText " +
                "OR UPPER(CAST(r.departureTime AS String)) LIKE :filterText " +
                "OR CAST(r.availableSeats AS String) LIKE :filterText ";

        TypedQuery<Ride> query = em.createQuery(sql, Ride.class);
        query.setParameter("filterText", upperFilterText);
        System.out.println(query.getResultList().size());

        try {
            return query.getResultList().subList((page-1)+6*(page-1), ((page-1)+6*(page-1))+7);
        } catch (IndexOutOfBoundsException ex) {
            return query.getResultList().subList((page-1)+6*(page-1), query.getResultList().size());
        }
    }

    public List<Ride> getFilteredCount(FilterDto filterText) {
        String sql = "SELECT DISTINCT r FROM Ride r " +
                "WHERE UPPER(r.placeOfDeparture) LIKE :placeOfDeparture " +
                "OR UPPER(r.placeOfArrival) LIKE :placeOfArrival " +
                "OR UPPER(CAST(r.departureTime AS String)) LIKE :departureTime ";

        TypedQuery<Ride> query = em.createQuery(sql, Ride.class);
        if(filterText.placeOfArrival()!=null) {
            query.setParameter("placeOfArrival", filterText.placeOfArrival().toUpperCase());
        }
        else {
            query.setParameter("placeOfArrival", "");
        }
        if(filterText.placeOfDeparture()!=null) {
            query.setParameter("placeOfDeparture", filterText.placeOfDeparture().toUpperCase());
        }
        else {
            query.setParameter("placeOfDeparture", "");
        }
        query.setParameter("departureTime", filterText.departureTime());
        return query.getResultList();
    }

    public List<Ride> getAllRidesLoader() {
        Faker faker = new Faker(new Locale("de-AT"));
        //faker.see(12345);
        //Ride newRide;

        Ride check = em.find(Ride.class, 150);
        System.out.println(check);

        if(em.find(Ride.class, 150) != null) {
            return null;
        }

        for (int i = 150; i < 200; i++) {
            //Datum
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime departureTime;
            Ride newRide = null;
            do {
                long randomDays = faker.number().numberBetween(1, 30); // Zufällige Anzahl an Tagen
                departureTime = now.plusDays(randomDays); // Addiere die zufällige Anzahl an Tagen
            } while (departureTime.isBefore(now));

            //Adreesse befindet sich nur in Österreich
            String placeOfDeparture = faker.address().cityName();
            String placeOfArrival = faker.address().cityName();

            int availableSeats = faker.number().numberBetween(1, 7);
            Long id = Long.valueOf(i);

            //nur Vorname und Nachname
            String driver = faker.name().firstName();
            driver += " " + faker.name().lastName();

            newRide = new Ride(id, Timestamp.valueOf(departureTime), placeOfDeparture, placeOfArrival, availableSeats, driver);

            em.persist(newRide);
            //Long rideId = i + 20L;
            //System.out.println(rideId);

            /*RideUserAssociationId id = new RideUserAssociationId(i + 31L, 7L);
            RideUserAssociation rua = new RideUserAssociation(id, true);
            em.persist(rua);*/
        }


        return em.createQuery("select r from Ride r order by r.id", Ride.class).getResultList();
    }

    public List<DrivUser> getPassengers(Long id) {
        String sql = "select d from RideRegister rr " +
                "join DrivUser d on rr.username = d.username where rr.rideId = :id";
        TypedQuery<DrivUser> query = em.createQuery(sql, DrivUser.class);
        query.setParameter("id", id);
        return query.getResultList();
    }

    public void pickProfilePicture(ProfilePictureDto profilePicture) {
        String sql = "select d from DrivUser d " +
                "where d.username = :username";
        TypedQuery<DrivUser> query = em.createQuery(sql, DrivUser.class);
        query.setParameter("username", profilePicture.username());
        DrivUser actUser = query.getSingleResult();
        System.out.println(actUser.lastName);
        System.out.println("img: " + profilePicture.img());
        actUser.setImg(profilePicture.img());
        em.merge(actUser);
    }


    public void rateRide(RateRideDto rateRide) {
        Ride selectedRide = em.find(Ride.class, rateRide.id());
        selectedRide.setStars(rateRide.stars());

        UsernameDto username = new UsernameDto(selectedRide.driver);
        DrivUser driver = getUserByUsername(username);
        driver.setStars(selectedRide.stars);

        Rate rate = new Rate(selectedRide.id, rateRide.stars(),selectedRide.driver);
        em.persist(rate);
    }

    public Long getRidesOffered(String username) {

            // JPQL-Query, um die Anzahl der Fahrten zu ermitteln, die von einem bestimmten Fahrer angeboten wurden
            String jpql = "SELECT COUNT(r) FROM Ride r WHERE r.driver = :username";
            TypedQuery<Long> query = em.createQuery(jpql, Long.class);
            query.setParameter("username", username);

            Long count = query.getSingleResult(); // Ergebnis der COUNT-Abfrage
            return count; // Long in int umwandeln und zurückgeben

    }

    public Long getOthersRides(String username) {

        // JPQL-Query, um die Anzahl der Fahrten zu ermitteln, die von einem bestimmten Fahrer angeboten wurden
        String jpql = "SELECT COUNT(r) FROM RideRegister r WHERE r.username = :username";
        TypedQuery<Long> query = em.createQuery(jpql, Long.class);
        query.setParameter("username", username);

        Long count = query.getSingleResult(); // Ergebnis der COUNT-Abfrage
        return count; // Long in int umwandeln und zurückgeben

    }

    public List<StarsChartDto> getStarsChart(String username) {
        // JPQL-Query, um die Sternebewertungen eines Benutzers zu holen
        String jpql = "SELECT r.stars, COUNT(r.stars) FROM Rate r WHERE r.username = :username GROUP BY r.stars";

        TypedQuery<Object[]> query = em.createQuery(jpql, Object[].class);
        query.setParameter("username", username);

        List<Object[]> results = query.getResultList();

        // Standardwerte für 1 bis 5 Sterne setzen (mit 0 als Default) und als veränderliche Liste initialisieren
        List<StarsChartDto> starsChart = new ArrayList<>(List.of(
                new StarsChartDto(1L, 0L, getColorCode(1L)),
                new StarsChartDto(2L, 0L, getColorCode(2L)),
                new StarsChartDto(3L, 0L, getColorCode(3L)),
                new StarsChartDto(4L, 0L, getColorCode(4L)),
                new StarsChartDto(5L, 0L, getColorCode(5L))
        ));

        // Verarbeite die Abfrageergebnisse
        if (results != null && !results.isEmpty()) {
            results.forEach(result -> {
                if (result[0] != null && result[1] != null) {
                    try {
                        // Überprüfe, ob die Sterne und die Anzahl valide sind
                        Long stars = (Long) result[0];
                        Long count = (Long) result[1];

                        // Verarbeite nur Sterne im Bereich von 1 bis 5
                        if (stars >= 1 && stars <= 5) {
                            starsChart.stream()
                                    .filter(dto -> dto.stars().equals(stars))
                                    .findFirst()
                                    .ifPresent(dto -> {
                                        // Update den Sterneneintrag mit dem korrekten Count
                                        starsChart.set(stars.intValue() - 1, new StarsChartDto(stars, count, getColorCode(stars)));
                                    });
                        }
                    } catch (ClassCastException e) {
                        // Logge den Fehler, falls ein Casting-Problem auftritt
                        System.err.println("Fehler beim Verarbeiten der Sternebewertung: " + e.getMessage());
                    }
                }
            });
        }

        return starsChart;
    }



    private String getColorCode(Long stars) {
        switch (stars.intValue()) {
            case 1:
                return "#10161f"; // Rot für 1 Stern
            case 2:
                return "#10161f"; // Orange für 2 Sterne
            case 3:
                return "#10161f"; // Gelb für 3 Sterne
            case 4:
                return "#10161f"; // Hellgrün für 4 Sterne
            case 5:
                return "#10161f"; // Grün für 5 Sterne
            default:
                return "#10161f"; // Standardfarbe
        }
    }
}
