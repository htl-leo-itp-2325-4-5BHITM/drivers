import { getPage, loadRides } from "./service/ride-service"
import { loadUsers } from "./service/user-service"
import "./components/ride-table-component"
import "./components/users-option-component"
import "./components/login-field-component"
import {Ride,RidePost,store} from "./model/model"
import { DateTime } from 'luxon';

window.addEventListener("DOMContentLoaded", () => loaded())


async function loaded() {
    getPage(1)
    loadUsers()
}

//sortieren
export function sortData(sorted: Boolean, column: String) {
    console.log("sortData fetch")
    fetch('http://localhost:4200/api/drivus/rides/getSortedRide/'+sorted+'/'+column, {
        method: 'GET',
    })
        .then(response => {
            // Handle die Antwort hier
            console.log("gehd")
        })
        .catch(error => {
            // Handle Fehler hier
            console.log("Hat nd funktioniert zum speichan")
        });
}

function saveDataInput() {
    //var username = (this.shadowRoot.getElementById('log-in-name') as HTMLInputElement).value;
    console.log("fffff");

} 