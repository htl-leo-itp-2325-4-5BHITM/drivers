import {Ride, store} from "../model/model"
import {html, render} from "lit-html"
import { DateTime } from 'luxon'
import {saveChanges, sortData} from "../index"
// für Sortierung
let lastSortedColumn: String | null = null;
let isAscendingOrder = true;


class RideTableComponent extends HTMLElement {
    connectedCallback() {
        console.log("RideTable loaded")
        store.subscribe(model => {
            console.log("data changed", model)
            this.render(model.drives, model.currentRide)
        })
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    render(drives: Ride[], currentRide?: Ride) {
        //console.log("rides to render", drives)
        render(this.tableTemplate(drives, currentRide), this.shadowRoot)
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
        <button @click=${()=> this.getSeat("getSeat")}>get your Seat</button></td>
        `
    }
    tableTemplate(rides: Ride[], currentRide?: Ride) {
        const rows = rides.map(ride=>this.rowTemplate(ride))
        //const rideTime = new Date(currentRide.departureTime);
        //let departureTime = currentRide.departureTime;
        //console.log(departureTime);
        return html`
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <div id="ride-finder-tab">
            
            <table class="w3-table-all">
            <thead class="">
                    <tr>
                        <th  @click=${()=>this.sortRides("date")}>Date</th>
                        <th  @click=${()=>this.sortRides("departureTime")}>Departure Time</th>
                        <th  @click=${()=>this.sortRides("placeOfDeparture")}>Place of Departure</th>
                        <th  @click=${()=>this.sortRides("placeOfArrival")}>Place of Arrival</th>
                        <th  @click=${()=>this.sortRides("availableSeats")}>Available seats</th>
                        <th @click=${()=>this.sortRides("driver")}>Driver</th>
                    </tr>
                </thead>
            <tbody>
                ${rows}
            </tbody>
            </table>
        </div>
        <!-- The Modal -->
        <div id="ride-dialog" class="w3-modal">
        <div class="w3-modal-content">
            <div class="w3-container">
            <span id="close-button" @click=${()=> this.closeDialog()}
                class="w3-button w3-display-topright">&times;</span>
                <h2>Change data</h2>
                <form id="form_head_change">
                    <div class="table-input" id="form_label">
                        <label for="fahrer">Driver</label><br>
                        <input type="text" id="fahrer" name="fahrer" value='${currentRide?.driver}'><br><br>

                        <label for="abfort">From</label><br>
                        <input type="text" id="abfort" name="abfort" value='${currentRide?.placeOfDeparture}'><br><br>

                        <label for="ankort">To</label><br>
                        <input type="text" id="ankort" name="ankort" value='${currentRide?.placeOfArrival}'><br><br>

                        <label for="datum">Date</label><br>
                        <input type="date" id="datum" name="datum"><br><br>

                        <label for="abfzeit">Departure Time:</label><br>
                        <input type="time" id="abfzeit" name="abfzeit"><br><br>

                        <label for="fplatz">Available seats:</label><br>
                        <input type="number" min="1" id="fplatz" name="fplatz" value='${currentRide?.availableSeats}'><br><br>
                    </div>
                    
                    <input type="submit" id="submit" name="save">
                </form>
            </div>
        </div>
        </div>
    ` //<button @click=${()=> saveChanges()}>save</button>
    }
    closeDialog(){
        const dialog = this.shadowRoot.getElementById('ride-dialog')
        dialog.style.display = 'none' 
    }
    private rowClick(ride: Ride) {
        const model = Object.assign({}, store.getValue())
        model.currentRide = ride
        store.next(model)
        const dialog = this.shadowRoot.getElementById('ride-dialog')
        dialog.style.display = 'block' 
        console.log("in rowclick")
    
        
    }
    private sortRides(column: String) {
        //alert(`Column ${column} for sort selected`)
        console.log(column)

        if (lastSortedColumn === column) {
            // Wenn zweimal hintereinander auf dieselbe Spalte geklickt wird,
            // ändere die Sortierreihenfolge
            isAscendingOrder = !isAscendingOrder;
        } else {
            // Wenn auf eine andere Spalte geklickt wird, setze die vorherige Sortierung zurück
            isAscendingOrder = true;
        }
        lastSortedColumn = column;


        //wie sortiert und Spalte an Server
        sortData(isAscendingOrder,lastSortedColumn)
        console.log("in sortRides")
    }
    private getSeat(column: String) {
        alert(`Column ${column} for sort selected`)
        console.log("you took a seat")
    }
    /*private saveChanges() {
        
        //event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
            
        var url = "http://localhost:4200/api/rides/changeRide"
        console.log(url)
    
        // Daten aus dem Formular erfassen
        var dateInputValue = ((document.getElementById('datum') as HTMLInputElement).value);
        var timeInputValue = (document.getElementById('abfzeit') as HTMLInputElement).value;
    
        const combinedDateTime = DateTime.fromFormat(`${dateInputValue}:${timeInputValue}`, 'yyyy-MM-dd:HH:mm');
    
        console.log("date",dateInputValue); // Überprüfe das Datumformat
        console.log("time",timeInputValue); // Überprüfe das Zeitformat
        console.log("combine",combinedDateTime); // Überprüfe das kombinierte Datum und die Zeit
    
        const formData: Ride = {
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
                console.log("gehd")
            })
            .catch(error => {
                // Handle Fehler hier
                console.log("Hat nd funktioniert zum Ändern")
            });
        //element.innerHTML = "Hopefully the information is right this time!";
    
    }*/
    
}

customElements.define("ride-table", RideTableComponent)