import { Ride, Model, RideCount } from "Model/model"
import { store } from "../model/model"
import { RegisterData,FilterData } from "Model/model"
import { produce } from "immer"

const RIDES_URL = "/api/drivus/rides"

export async function loadRides() {
    const response = await fetch(RIDES_URL)
    const rides: Ride[] = await response.json()
    const nextState = produce(store.getValue(), model => {
        model.drives = rides
    })
    console.log("rides loaded", rides)
    store.next(nextState)
}

export async function getFakeRides() {
    const response = await fetch(`/api/drivus/rides/getAllRides/javaFaker/`)
}

export async function getPage(page: number) {
    const response = await fetch(`/api/drivus/pagination/${page}`)
    const rides: Ride[] = await response.json()
    const nextState = produce(store.getValue(), model => {
        model.drives = rides
    })
    console.log("rides loaded", rides)
    store.next(nextState)
}

export async function getCount() {
    const response = await fetch(`/api/drivus/rides/getCount`)
    const count: number = await response.json()
    console.log(count)
    const nextState = produce(store.getValue(), model => {
        model.ridesCount = count
    })
    //console.log("rides loaded", rides)
    store.next(nextState)
    //return count;
}

export async function getFilteredCount(filterText: String) {
    const response = await fetch(`/api/drivus/rides/getFilteredCount/${filterText}`)
    const count: number = await response.json()
    console.log(count)
    const nextState = produce(store.getValue(), model => {
        model.ridesCount = count
    })
    //console.log("rides loaded", rides)
    store.next(nextState)
    //return count;
}

export async function getFiltered(filterText: String, page: number) {
    console.log("toFilterText: " + filterText);
    const url = `http://localhost:4200/api/drivus/rides/getFilteredRide/${filterText}${page}`;

    const response = await fetch(url)
    const rides: Ride[] = await response.json()
    const nextState = produce(store.getValue(), model => {
        model.drives = rides
    })
    console.log("rides loaded", rides)
    store.next(nextState)
    getFilteredCount(filterText)
}

export async function getSorted(sorted: Boolean, column: String) {
    console.log("sorted: " + sorted);
    console.log("column: " + column);
    const url = `http://localhost:4200/api/drivus/rides/getSortedRide/${sorted}/${column}`;

    const response = await fetch(url)
    const rides: Ride[] = await response.json()
    const nextState = produce(store.getValue(), model => {
        model.drives = rides
    })
    console.log("rides loaded", rides)
    store.next(nextState)
}


export function getSeat(ride: Ride) {
    console.log(ride)
    var url = "http://localhost:4200/api/drivus/rides/registerForRide"
    var id = ride.id
    console.log(id)

    if (ride.availableSeats > 0) {
        // Daten in JSON umwandeln
        let data: RegisterData = {
            rideId: id,
            username: localStorage.getItem("username")
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
                getPage(1)
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
            username: localStorage.getItem("username")
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
                getPage(1)
                console.log("gehd")
            })
            .catch(error => {
                // Handle Fehler hier
                console.log("Hat nd funktioniert zum Ändern")
            });
    }
}