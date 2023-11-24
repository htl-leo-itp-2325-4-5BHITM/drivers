import {Ride, store} from "../model/model"
import {html, render} from "lit-html"
import { DateTime } from 'luxon';
import { loadRide } from "src/service/getRide-service";
//import { Ride, Model2 } from "Model/model"   


const inputTemplate = (ride: Ride) => {
    // Departure Time in DateTime-Objekt umwandeln
    const departureTime = DateTime.fromISO(ride.departureTime);

    // Zeit und Datum separat formatieren
    const formattedTime = departureTime.toFormat('HH:mm'); // Zeit formatieren (z.B. 10:30)
    const formattedDate = departureTime.toFormat('yyyy-MM-dd'); // Datum formatieren (z.B. 2023-11-22)

   

    return html`<div class="table-input-change-ride">
        <input type="date" id="datum" name="datum" value="${formattedDate}">
        <input type="time" id="abfzeit" name="abfzeit" value="${formattedTime}">
        <input type="text" id="abfort" name="abfort" value="${ride.placeOfDeparture}">
        <input type="text" id="ankort" name="ankort" value="${ride.placeOfArrival}">
        <input type="number" min="1" id="fplatz" name="fplatz" value="${ride.availableSeats}">
        <input type="text" id="fahrer" name="fahrer" value="${ride.driver}">
    </div>`
};


const labelTemplate = (rides: Ride[]) => {
    const inputfields = rides.map(inputTemplate)
    return html`
    <h1 id="form_headline_change_ride">Change Ride</h1>
        <form id="form_head_change_ride">
            <div class="table-input-change-ride">
                <label for="datum" class="label_change_ride">Date:</label>
                <label for="abfzeit" class="label_change_ride">Departure Time:</label>
                <label for="abfort" class="label_change_ride">Place of Departure:</label>
                <label for="ankort" class="label_change_ride">Place of Arrival:</label>
                <label for="fplatz" class="label_change_ride">Available seats:</label>
                <label for="fahrer" class="label_change_ride">Driver:</label>
            </div>
            ${inputfields}
            <input type="submit" id="submit" name="senden">
        </form>`;

}

class RideTableComponent extends HTMLElement {
    connectedCallback() {
        console.log("Change-Ride loaded")
        store.subscribe(model => {
            console.log("get data", model)
            this.render(model.drives)
        })
    }
    render(drives: Ride[]) {
        //console.log("rides to render", drives)
        render(labelTemplate(drives), this)
    }
}
customElements.define("change-ride", RideTableComponent)