import { Ride, Model } from "Model/model"
import { store } from "../model/model"
import { DateTime } from 'luxon'

const RIDES_URL = "/api/rides"

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
    var url = "http://localhost:4200/api/rides/registerForRide"
    var id = ride.id
    console.log(id)

    if (ride.availableSeats > 0) {
        // Daten in JSON umwandeln
        const jsonData = JSON.stringify(id);

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
