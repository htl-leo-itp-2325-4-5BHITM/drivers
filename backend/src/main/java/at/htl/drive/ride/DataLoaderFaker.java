package at.htl.drive.ride;


import com.github.javafaker.Faker;

import java.time.LocalDateTime;
import java.util.Locale;

public class DataLoaderFaker {

    public static void main(String[] args) {
        Faker faker = new Faker();

        for (int i = 0; i < 50; i++) {
            //Datum
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime departureTime;

            do {
                long randomDays = faker.number().numberBetween(1, 30); // Zufällige Anzahl an Tagen
                departureTime = now.plusDays(randomDays); // Addiere die zufällige Anzahl an Tagen
            } while (departureTime.isBefore(now));

            //Adreesse befindet sich nur in Österreich
            Faker usFaker = new Faker(new Locale("de-AT"));
            String placeOfDeparture = usFaker.address().cityName();
            String placeOfArrival = usFaker.address().cityName();

            int availableSeats = faker.number().numberBetween(1, 7);

            //nur Vorname und Nachname
            String driver = faker.name().firstName();
            driver += " " + faker.name().lastName();


            System.out.println(departureTime);
            System.out.println(placeOfDeparture);
            System.out.println(placeOfArrival);
            System.out.println(availableSeats);
            System.out.println(driver);
        }




    }

}
