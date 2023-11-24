import {Ride, store} from "../model/model"
import {html, render} from "lit-html"
import { DateTime } from 'luxon'



class RideTableComponent extends HTMLElement {
    connectedCallback() {
        console.log("RideTable loaded")
        store.subscribe(model => {
            console.log("data changed", model)
            this.render(model.drives)
        })
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    render(drives: Ride[]) {
        //console.log("rides to render", drives)
        render(this.tableTemplate(drives), this.shadowRoot)
    }
    rowTemplate(ride: Ride) {
        // Departure Time in DateTime-Objekt umwandeln
        const departureTime = DateTime.fromISO(ride.departureTime);
    
        // Zeit und Datum separat formatieren
        const formattedTime = departureTime.toFormat('HH:mm'); // Zeit formatieren (z.B. 10:30)
        const formattedDate = departureTime.toFormat('yyyy-MM-dd'); // Datum formatieren (z.B. 2023-11-22)
    
        console.log("render ride", ride)
        return html`
        <tr @click=${()=>this.rowClick(ride)}>
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>${ride.placeOfDeparture}</td>
            <td>${ride.placeOfArrival}</td>
            <td>${ride.availableSeats}</td>
            <td>${ride.driver}</td>
        </tr>
        `
    }
    tableTemplate(rides: Ride[]) {
        const rows = rides.map(ride=>this.rowTemplate(ride))
        return html`
        <div id="ride-finder-tab">
            
            <table id="table">
            <thead class="table-head">
                    <tr>
                        <th>Date</th>
                        <th>Departure Time</th>
                        <th>Place of Departure</th>
                        <th>Place of Arrival</th>
                        <th>Available seats</th>
                        <th>Driver</th>
                    </tr>
                </thead>
            <tbody>
                ${rows}
            </tbody>
            </table
        </div>
    `
    }
    private rowClick(ride: Ride) {
        alert(`Ride selected ${ride.driver}`)
        console.log("in rowclick")
    }
}
customElements.define("ride-table", RideTableComponent)