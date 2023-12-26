import {DrivUser, storeUsers} from "../model/model"
import {html, render} from "lit-html"
import { loadUsers } from "../service/user-service"
import { DateTime } from 'luxon';
import {RidePost} from "../model/model"
import { loadRides } from "../service/ride-service"


class UsersOptionComponent extends HTMLElement {
    connectedCallback() {
        console.log("UserOptions loaded")
        storeUsers.subscribe(model => {
            console.log("data changed", model)
            this.render(model.drivUsers)
        })
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    render(users: DrivUser[]) {
        render(this.formTemplate(users), this.shadowRoot)
    }
    formTemplate(users: DrivUser[]) {
        const output = users.map(drivUser=>this.optionTemplate(drivUser))
        //w3-table-all
        return html`
        <form id="form_head">
                <div class="table-input" id="form_label">
                    
                    <label for="change_fahrer">Driver</label><br>
                    <select id="fahrer" name="fahrer">
                        ${output}
                    </select><br><br>

                    <label for="abfort">From</label><br>
                    <input type="text" id="abfort" name="abfort" placeholder="Linz"><br><br>

                    <label for="ankort">To</label><br>
                    <input type="text" id="ankort" name="ankort" placeholder="Leonding"><br><br>

                    <label for="datum">Date</label><br>
                    <input type="date" id="datum" name="datum"><br><br>

                    <label for="abfzeit">Time:</label><br>
                    <input type="time" id="abfzeit" name="abfzeit"><br><br>

                    <label for="fplatz">Available seats:</label><br>
                    <input type="number" min="1" id="fplatz" name="fplatz" value="1"><br><br>

                </div>
                <div class="table-input"></div>
                <input @click=${()=> this.submit()} type="button" id="submit" value="submit">
            </form>`
    }
    optionTemplate(drivUser: DrivUser) {
        console.log("render user", drivUser)
        return html`
        <option value="${drivUser.firstName} ${drivUser.lastName}">${drivUser.firstName} ${drivUser.lastName}</option>
        `
    }
    private submit() {
        console.log("bin im form")

        // Daten aus dem Formular erfassen
        var dateInputValue = ((this.shadowRoot.getElementById('datum') as HTMLInputElement).value);
        var timeInputValue = (this.shadowRoot.getElementById('abfzeit') as HTMLInputElement).value;

        const combinedDateTime = DateTime.fromFormat(`${dateInputValue}:${timeInputValue}`, 'yyyy-MM-dd:HH:mm');

        //Funktionaufruf von Daten überprüfen
        //checkData();
        if (this.checkData()) {
            (document.getElementById('errorWrongInputNewRide') as HTMLInputElement).innerHTML = 'Added ride.';
            console.log("date", dateInputValue); // Überprüfe das Datumformat
            console.log("time", timeInputValue); // Überprüfe das Zeitformat
            console.log("combine", combinedDateTime); // Überprüfe das kombinierte Datum und die Zeit

            const formData: RidePost = {
                driver: (this.shadowRoot.getElementById('fahrer') as HTMLInputElement).value,
                departureTime: combinedDateTime,
                placeOfDeparture: (this.shadowRoot.getElementById('abfort') as HTMLInputElement).value,
                placeOfArrival: (this.shadowRoot.getElementById('ankort') as HTMLInputElement).value,
                availableSeats: parseInt((this.shadowRoot.getElementById('fplatz') as HTMLInputElement).value)
            };
            console.log("form Data: " + formData)
            // Daten in JSON umwandeln
            const jsonData = JSON.stringify(formData);
            console.log("form Data JSON: " + jsonData)

            // Hier kannst du die JSON-Daten an deinen Pfad senden, z. B. mit fetch()
            fetch('http://localhost:4200/api/rides/postRide', {
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
                    console.log("Hat nd funktioniert zum speichan")
                });
        }
    } 
    private checkData() {
        let isValid: Boolean = true;

        // Überprüfe, ob der Name nicht null oder leer ist
        /*var driverInput = (document.getElementById('fahrer') as HTMLInputElement).value;
    
        if (!driverInput.trim() || driverInput.length <= 2) {
            //alert("no name enterd");
            (document.getElementById('errorWrongInputNewRide') as HTMLInputElement).innerHTML = 'Please enter a valid driver name.';
            isValid = false;
        }*/

        // Überprüfe, ob der Abfahrtsort nicht null oder leer ist
        var departureInput = (this.shadowRoot.getElementById('abfort') as HTMLInputElement).value;

        if (!departureInput.trim() || departureInput.length <= 2) {
            //alert("Invalid departure location");
            (document.getElementById('errorWrongInputNewRide') as HTMLInputElement).innerHTML = 'Please enter a valid departure location.';
            isValid = false;
        }

        /// Überprüfe, ob der Ankunftsort nicht null oder leer ist
        var arrivalInput = (this.shadowRoot.getElementById('ankort') as HTMLInputElement).value;

        if (!arrivalInput.trim() || arrivalInput.length <= 2) {
            //alert("Invalid arrival location");
            (document.getElementById('errorWrongInputNewRide') as HTMLInputElement).innerHTML = 'Please enter a valid arrival location.';
            isValid = false;
        }

        //nach vergangenem Datum überprüfen und Datum auf null
        const selectedDate = (this.shadowRoot.getElementById('datum') as HTMLInputElement).value;
        const currentDate = new Date().toISOString().split('T')[0]; // Heutiges Datum

        if (selectedDate < currentDate || !selectedDate) {
            (document.getElementById('errorWrongInputNewRide') as HTMLInputElement).innerHTML = 'Please enter a date that is not in the past.';
            isValid = false;
            //alert('Selected date cannot be in the past or null.');
        }

        //Überprüfe, ob die Zeit nicht null oder leer ist
        var timeInputValue = (this.shadowRoot.getElementById('abfzeit') as HTMLInputElement).value;

        if (!timeInputValue) {
            (document.getElementById('errorWrongInputNewRide') as HTMLInputElement).innerHTML = 'Please enter a time.';
            isValid = false;
            //alert('Selected date cannot be in the past or null.');
        }
        return isValid;
    }   
}

customElements.define("users-option", UsersOptionComponent)