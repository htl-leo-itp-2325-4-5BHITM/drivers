import { Ride, Model } from "Model/model"
import { store } from "../model/model"
import { DateTime } from 'luxon'
import { RegisterData } from "Model/model"

const RIDES_URL = "/api/drivus/rides"

async function loadRides() {
    const response = await fetch(RIDES_URL)
    const rides: Ride[] = await response.json()
    const model: Model = {
        drives: rides
    }
    console.log("rides loaded", rides)
    store.next(model)
}
export { loadRides }



export function getSeat(ride: Ride) {
    console.log(ride)
    var url = "http://localhost:4200/api/drivus/rides/registerForRide"
    var id = ride.id
    console.log(id)

    if (ride.availableSeats > 0) {
        // Daten in JSON umwandeln
        let data: RegisterData = {
            rideId: id,
            username: sessionStorage.getItem("username")
        };
        const jsonData = JSON.stringify(data);
        console.log(jsonData)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
            .then(response => {
                // Handle die Antwort hier
                loadRides()
                console.log("gehd")
            })
            .catch(error => {
                // Handle Fehler hier
                console.log("Hat nd funktioniert zum Ändern")
            });
    }
}

export function removeSeat(ride: Ride) {
    console.log(ride)
    var url = "http://localhost:4200/api/drivus/rides/unregisterForRide"
    var id = ride.id
    console.log(id)

    if (ride.availableSeats > 0) {
        // Daten in JSON umwandeln
        let data: RegisterData = {
            rideId: id,
            username: sessionStorage.getItem("username")
        };
        const jsonData = JSON.stringify(data);
        console.log(jsonData)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
            .then(response => {
                // Handle die Antwort hier
                loadRides()
                console.log("gehd")
            })
            .catch(error => {
                // Handle Fehler hier
                console.log("Hat nd funktioniert zum Ändern")
            });
    }
}


/*
export function saveChanges(id: number) {
    var url = "http://localhost:4200/api/rides/changeRide"
    
    var driv = (document.getElementById('fahrer') as HTMLInputElement);
    console.log(driv);
    console.log(driv.value);

    // Daten aus dem Formular erfassen
    var dateInputValue = (document.getElementById('datum') as HTMLInputElement).value;
    var timeInputValue = (document.getElementById('abfzeit') as HTMLInputElement).value;
    console.log(dateInputValue)

    const combinedDateTime = DateTime.fromFormat(`${dateInputValue}:${timeInputValue}`, 'yyyy-MM-dd:HH:mm');

    console.log("date",dateInputValue); // Überprüfe das Datumformat
    console.log("time",timeInputValue); // Überprüfe das Zeitformat
    console.log("combine",combinedDateTime); // Überprüfe das kombinierte Datum und die Zeit

    const formData: Ride = {
        id: id,
        driver: (document.getElementById('fahrer') as HTMLInputElement).value,
        departureTime: combinedDateTime,
        placeOfDeparture: (document.getElementById('abfort') as HTMLInputElement).value,
        placeOfArrival: (document.getElementById('ankort') as HTMLInputElement).value,
        availableSeats: parseInt((document.getElementById('fplatz') as HTMLInputElement).value)
    };
    console.log("form Data: "+formData)
    // Daten in JSON umwandeln
    const jsonData = JSON.stringify(formData);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
        .then(response => {
            // Handle die Antwort hier
            loadRides()
            this.closeDialog()
            console.log("gehd")
        })
        .catch(error => {
            // Handle Fehler hier
            console.log("Hat nd funktioniert zum Ändern")
        });
} */