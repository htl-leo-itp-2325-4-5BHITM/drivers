import {Ride, store} from "../model/model"
import {html, render} from "lit-html"

const rowTemplate = (ride: Ride) => html`
<tr>
    <td>${ride.departureTime}</td>
    <td>${ride.placeOfDeparture}</td>
    <td>${ride.placeOfArrival}</td>
    <td>${ride.availableSeats}</td>
    <td>${ride.driver}</td>
    
</tr>
`

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