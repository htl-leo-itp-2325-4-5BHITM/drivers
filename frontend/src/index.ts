import {getPage, getSorted, loadRides, getFakeRides, getCount} from "./service/ride-service"
import { loadUsers } from "./service/user-service"
import "./components/ride-table-component"
import "./components/users-option-component"
import "./components/login-field-component"

window.addEventListener("DOMContentLoaded", () => loaded())

async function loaded() {
    getPage(1, 7)
    loadUsers()
    getFakeRides()
    getCount()
}

//sortieren
/*
export function sortData(sorted: Boolean, column: String) {
    console.log("sortData fetch")
    fetch('http://localhost:4200/api/drivus/rides/getSortedRide/'+sorted+'/'+column, {
        method: 'GET',
    })
        .then(response => {
            // Handle die Antwort hier
            getSorted()
            console.log("gehd")
        })
        .catch(error => {
            // Handle Fehler hier
            console.log("Hat nd funktioniert zum speichan")
        });
}*/