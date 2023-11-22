import {Ride, store} from "../model/model"
import {html, render} from "lit-html"
import { DateTime } from 'luxon';



const rowTemplate = (ride: Ride) => {
    // Departure Time in DateTime-Objekt umwandeln
    const departureTime = DateTime.fromISO(ride.departureTime);

    // Zeit und Datum separat formatieren
    const formattedTime = departureTime.toFormat('HH:mm'); // Zeit formatieren (z.B. 10:30)
    const formattedDate = departureTime.toFormat('yyyy-MM-dd'); // Datum formatieren (z.B. 2023-11-22)

    return html`
    <tr>
        <td>${formattedDate}</td>
        <td>${formattedTime}</td>
        <td>${ride.placeOfDeparture}</td>
        <td>${ride.placeOfArrival}</td>
        <td>${ride.availableSeats}</td>
        <td>${ride.driver}</td>
    </tr>
    `;
};

const tableTemplate = (rides: Ride[]) => {
    const rows = rides.map(rowTemplate)
    return html`
    <table>
    <tbody>
        ${rows}
    </tbody>
    </table
`
}

class RideTableComponent extends HTMLElement {
    connectedCallback() {
        console.log("RideTable loaded")
        store.subscribe(model => {
            console.log("data changed", model)
            this.render(model.drives)
        })
    }
    render(drives: Ride[]) {
        //console.log("rides to render", drives)
        render(tableTemplate(drives), this)
    }
}
customElements.define("ride-table", RideTableComponent)