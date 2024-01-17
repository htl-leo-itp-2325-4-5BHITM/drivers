import { Ride, store } from "../model/model"
import { html, render } from "lit-html"
import { DateTime } from 'luxon'
import { sortData } from "../index"
import { loadRides, getSeat, removeSeat } from "../service/ride-service"
// für Sortierung
let lastSortedColumn: String | null = null;
let isAscendingOrder = true;
let dateValue = ''; // Standardwerte für Datum und Zeit
let timeValue = '';

export class RideTableComponent extends HTMLElement {
    connectedCallback() {
        console.log("RideTable loaded")
        store.subscribe(model => {
            console.log("data changed", model)
            //NUR AUSPROBIER DINGSI
            if (sessionStorage.getItem("isLogedIn") == "true") {
                this.render(model.drives, model.currentRide);
            }
        })
    }
    defaulting(){
        store.subscribe(model => {
            console.log("data changed", model)
            if (sessionStorage.getItem("isLogedIn") != "true") {
                this.render(model.drives, model.currentRide);
            }
        })
    }
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    render(drives: Ride[], currentRide?: Ride) {
        render(this.tableTemplate(drives, currentRide), this.shadowRoot)
    }
    rowTemplate(ride: Ride) {
        // Departure Time in DateTime-Objekt umwandeln
        const departureTime = DateTime.fromISO(ride.departureTime);
        // Zeit und Datum separat formatieren
        const formattedTime = departureTime.toFormat('HH:mm'); // Zeit formatieren (z.B. 10:30)
        const formattedDate = departureTime.toFormat('yyyy-MM-dd'); // Datum formatieren (z.B. 2023-11-22)
        //<td><button @click=${()=> removeSeat(ride)}>-</button></td>
        console.log("render ride", ride)
        if(ride.driver == sessionStorage.getItem("username")) {
            return html`
        <tr class="ride-finder-entry-row">
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>${ride.placeOfDeparture}</td>
            <td>${ride.placeOfArrival}</td>
            <td>${ride.driver}</td>
            <td>${ride.availableSeats}</td>
            <td><div class="table-settings">
            <button class="table-setting-button"  class="setting-setting" @click=${() => this.rowClick(ride)}><img src="./img/gear.png" width="15vw"></button></div></td>
        </tr>
        `
        }
        return html`
        <tr class="ride-finder-entry-row">
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>${ride.placeOfDeparture}</td>
            <td>${ride.placeOfArrival}</td>
            <td>${ride.driver}</td>
            <td>${ride.availableSeats}</td>
            <td><div class="table-settings"><button class="table-setting-button" @click=${() => getSeat(ride)}><img src="./img/plus_inactive.png" width="15vw"></button>
            <button class="table-setting-button" class="setting-minus" @click=${() => removeSeat(ride)}><img src="./img/minus_inactive.png" width="15vw"></button>
           </div></td>
        </tr>
        `
    }
    tableTemplate(rides: Ride[], currentRide?: Ride) {
        const rows = rides.map(ride => this.rowTemplate(ride))
        // Überprüfen, ob currentRide definiert ist und departureTime hat
       if (currentRide != null && 'departureTime' in currentRide) {
           // Umwandeln des Zeitstempels in ein DateTime-Objekt
            const departureTime = DateTime.fromISO(currentRide.departureTime);

            // Extrahieren von Datum und Zeit aus dem DateTime-Objekt
            dateValue = departureTime.toFormat('yyyy-MM-dd');
            timeValue = departureTime.toFormat('HH:mm');
       }

        //w3-table-all
        return html`
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="./style/rideTable.css">
        
        <div id="ride-finder-table">
            
            <table id="ride-finder-table" cellpadding="0">
                <thead class="ride-finder-tablehead">
                    <tr>
                        <th  @click=${() => this.sortRides("date")}>Date</th>
                        <th  @click=${() => this.sortRides("departureTime")}>Time</th>
                        <th  @click=${() => this.sortRides("placeOfDeparture")}>From</th>
                        <th  @click=${() => this.sortRides("placeOfArrival")}>To</th>
                        <th @click=${() => this.sortRides("driver")}>Driver</th>
                        <th  @click=${() => this.sortRides("availableSeats")}>Empty seats</th>
                        <th > </th>
                        
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
            <div class="w3-container" >
            <span id="close-button" @click=${() => this.closeDialog()}
                class="w3-button w3-display-topright">&times;</span>
                <h2 class="w3-text-black">Change data</h2>
                <form id="form_head_change" class="w3-text-black">
                    <div class="table-input" id="form_label">
                    <label for="fahrer">Driver</label><br>
                        <input type="text" id="fahrer" name="fahrer" value='${currentRide?.driver}'><br><br>

                        <label for="abfort">From</label><br>
                        <input type="text" id="abfort" name="abfort" value='${currentRide?.placeOfDeparture}'><br><br>

                        <label for="ankort">To</label><br>
                        <input type="text" id="ankort" name="ankort" value='${currentRide?.placeOfArrival}'><br><br>

                        <label for="datum">Date</label><br>
                        <input type="date" id="datum" name="datum" value='${dateValue}'><br><br>

                        <label for="abfzeit">Time:</label><br>
                        
                        <input type="time" id="abfzeit" name="abfzeit" value='${timeValue}'><br><br>

                        <label for="fplatz">Available seats:</label><br>
                        <input type="number" min="1" id="fplatz" name="fplatz" value='${currentRide?.availableSeats}'><br><br>
                    </div>
                    <input @click=${() => this.saveChanges(currentRide?.id)} type="button" id="submit" value="save">
                    <input @click=${() => this.removeRide(currentRide?.id)} type="button" id="remove" value="remove">
                </form>
                <div id="errorWrongInput"></div>
            </div>
        </div>
        </div>`
    }
    closeDialog() {
        const dialog = this.shadowRoot.getElementById('ride-dialog')
        dialog.style.display = 'none'
    }
    private rowClick(ride: Ride) {
        const dateAndTime = ride.departureTime;
        console.log(dateAndTime)
        const words = dateAndTime.split(/[T.]/);
        console.log(words[0]);
        console.log(words[1]);
        const date = words[0];
        const time = words[1];

        const model = Object.assign({}, store.getValue())
        model.currentRide = ride
        store.next(model)
        const dialog = this.shadowRoot.getElementById('ride-dialog')
        dialog.style.display = 'block'
        console.log("in rowclick")
    }
    private sortRides(column: String) {
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

        //wird sortiert und Spalte an Server
        sortData(isAscendingOrder, lastSortedColumn)
        console.log("in sortRides")
    }
    private saveChanges(id: number) {
        var url = "http://localhost:4200/api/drivus/rides/changeRide"

        var driv = (this.shadowRoot.getElementById('fahrer') as HTMLInputElement);
        console.log(driv);
        console.log(driv.value);

        // Daten aus dem Formular erfassen
        var dateInputValue = (this.shadowRoot.getElementById('datum') as HTMLInputElement).value;
        var timeInputValue = (this.shadowRoot.getElementById('abfzeit') as HTMLInputElement).value;
        console.log(dateInputValue)

        const combinedDateTime = DateTime.fromFormat(`${dateInputValue}:${timeInputValue}`, 'yyyy-MM-dd:HH:mm');
    
        //this.checkData();
        if(this.checkData()){

            console.log("date",dateInputValue); // Überprüfe das Datumformat
            console.log("time",timeInputValue); // Überprüfe das Zeitformat
            console.log("combine",combinedDateTime); // Überprüfe das kombinierte Datum und die Zeit
        
            const formData: Ride = {
                id: id,
                driver: (this.shadowRoot.getElementById('fahrer') as HTMLInputElement).value,
                departureTime: combinedDateTime,
                placeOfDeparture: (this.shadowRoot.getElementById('abfort') as HTMLInputElement).value,
                placeOfArrival: (this.shadowRoot.getElementById('ankort') as HTMLInputElement).value,
                availableSeats: parseInt((this.shadowRoot.getElementById('fplatz') as HTMLInputElement).value)
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
        }
    }
    private removeRide(id: number) {
        var url = "http://localhost:4200/api/rides/removeRide"

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
                this.closeDialog()
                console.log("gehd")
            })
            .catch(error => {
                // Handle Fehler hier
                console.log("Hat nd funktioniert zum Ändern")
            });
    }

    //Input überprüfen
    private checkData(){

        let isValid: Boolean = true;

        // Überprüfe, ob der Name nicht null oder leer ist
        var driverInput = (this.shadowRoot.getElementById('fahrer') as HTMLInputElement).value;

        if (!driverInput.trim() || driverInput.length <= 2) {
            //alert("no name enterd");
            //alert("no name enterd");
            (this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a valid driver name.';
            isValid = false;
        }

        // Überprüfe, ob der Abfahrtsort nicht null oder leer ist
        var departureInput = (this.shadowRoot.getElementById('abfort') as HTMLInputElement).value;

        if (!departureInput.trim() || departureInput.length <= 2) {
            //alert("Invalid departure location");
            (this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a valid departure location.';
            isValid = false;
        }

        // Überprüfe, ob der Ankunftsort nicht null oder leer ist
        var arrivalInput = (this.shadowRoot.getElementById('ankort') as HTMLInputElement).value;

        if (!arrivalInput.trim() || arrivalInput.length <= 2) {
            //alert("Invalid arrival location");
            (this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a valid arrival location.';
            isValid = false;
        }

   
        //nach vergangenem Datum überprüfen und Datum auf null
        const selectedDate = (this.shadowRoot.getElementById('datum') as HTMLInputElement).value;
        const currentDate = new Date().toISOString().split('T')[0]; // Heutiges Datum

        if (selectedDate < currentDate || !selectedDate) {
            (this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a date that is not in the past.';
            isValid = false;
            //alert('Selected date cannot be in the past or null.');
        }

        //Überprüfe, ob die Zeit nicht null oder leer ist
        var timeInputValue = (this.shadowRoot.getElementById('abfzeit') as HTMLInputElement).value;

        if (!timeInputValue) {
            (this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a time.';
            isValid = false;
            //alert('Selected date cannot be in the past or null.');
        }
    
        return isValid;
      }
}


customElements.define("ride-table", RideTableComponent)