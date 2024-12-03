import { DrivUser, storeUserDetails, storeUsers } from "../model/model"
import { html, render } from "lit-html"
import { DateTime } from 'luxon';
import { RidePost } from "../model/model"
import { loadRides, getPage } from "../service/ride-service"


class UsersOptionComponent extends HTMLElement {
    connectedCallback() {
        console.log("UserOptions loaded")
        storeUsers.subscribe(model => {
            this.render(model.drivUsers)
        })
    }
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    render(users: DrivUser[]) {
        render(this.formTemplate(users), this.shadowRoot)
    }
    formTemplate(users: DrivUser[]) {
        return html`
            <link rel="stylesheet" href="../../style/register.css">
            <form id="form_head">

                <div id="register-image"></div>
                <div id="register-content">

                    <div class="table-input" id="register-grid">
                        <h2>Registration Info</h2>
                        
                            <div class="grid-item">
                                <input type="text" id="abfort" name="abfort" placeholder="From">
                            </div>
                            
                            <div class="grid-item">
                                <input type="text" id="abfortC" name="abfortC" placeholder="Coordinates">
                            </div>
                      
                            <div class="grid-item">
                                <input type="text" id="ankort" name="ankort" placeholder="To">
                            </div>

                            <div class="grid-item">
                                <input type="text" id="ankortC" name="ankortC" placeholder="Coordinates">
                            </div>

                            <div class="grid-item">
                                <input placeholder="Date"
                                       onfocus="(this.type='date')"
                                       onblur="(this.type='text')"
                                       id="datum" name="datum">
                            </div>
                            <div class="grid-item">
                                <input placeholder="Time"
                                       onfocus="(this.type='time')"
                                       onblur="(this.type='text')" id="abfzeit" name="abfzeit">
                            </div>
                            <div class="grid-item">
                                <input placeholder="Available Seats"
                                       onfocus="(this.type='number')"
                                       onblur="(this.type='text')" min="1" max="100" id="fplatz" name="fplatz">
                            </div>
                        
                        <div class="register-button-center">
                            <input @click=${() => this.submit()} type="button" id="register-submit" value="submit">
                        </div>
            </form>
        `
    }
    private async submit() {

        if (localStorage.getItem("isLogedIn") === "false") {
            return html`
            ${alert("Please log in to regist a new ride!")}`
        }
        console.log("bin im form")

        // Daten aus dem Formular erfassen
        var dateInputValue = ((this.shadowRoot.getElementById('datum') as HTMLInputElement).value);
        var timeInputValue = (this.shadowRoot.getElementById('abfzeit') as HTMLInputElement).value;

        const combinedDateTime = DateTime.fromFormat(`${dateInputValue}:${timeInputValue}`, 'yyyy-MM-dd:HH:mm');

        //Funktionaufruf von Daten überprüfen
        //checkData();
        if (this.checkData()) {
            //(document.getElementById('errorWrongInputNewRide') as HTMLInputElement).innerHTML = 'Added ride.';
            alert("Added ride!");
            console.log("date", dateInputValue); // Überprüfe das Datumformat
            console.log("time", timeInputValue); // Überprüfe das Zeitformat
            console.log("combine", combinedDateTime); // Überprüfe das kombinierte Datum und die Zeit

            //let driver = localStorage.getItem("username");
            let data = localStorage.getItem('userDetails');
            console.log(data)
            let parsedData = JSON.parse(data);

            let drivers = parsedData.username;

            const formData: RidePost = {
                driver: drivers,
                departureTime: combinedDateTime,
                placeOfDeparture: (this.shadowRoot.getElementById('abfort') as HTMLInputElement).value,
                placeOfArrival: (this.shadowRoot.getElementById('ankort') as HTMLInputElement).value,
                placeOfDepartureCoordinate: (this.shadowRoot.getElementById('abfortC') as HTMLInputElement).value,
                placeOfArrivalCoordinate: (this.shadowRoot.getElementById('ankortC') as HTMLInputElement).value,
                availableSeats: parseInt((this.shadowRoot.getElementById('fplatz') as HTMLInputElement).value)
            };
            console.log("form Data: " + formData)
            // Daten in JSON umwandeln
            const jsonData = JSON.stringify(formData);
            console.log("form Data JSON: " + jsonData)


            const cleardepartureDate = this.shadowRoot.getElementById("datum") as HTMLInputElement;
            const cleardepartureTime = this.shadowRoot.getElementById("abfzeit") as HTMLInputElement;
            const clearPlaceOfDeparture = this.shadowRoot.getElementById("abfort") as HTMLInputElement;
            const clearPlaceOfArrival = this.shadowRoot.getElementById("ankort") as HTMLInputElement;
            const clearPlaceOfDepartureCoordinate = this.shadowRoot.getElementById("abfortC") as HTMLInputElement;
            const clearPlaceOfArrivalCoordinate = this.shadowRoot.getElementById("ankortC") as HTMLInputElement;
            const clearAvailableSeats = this.shadowRoot.getElementById("fplatz") as HTMLInputElement;


            cleardepartureDate.value = '';
            cleardepartureTime.value = '';
            clearPlaceOfDeparture.value = '';
            clearPlaceOfArrival.value = '';
            clearPlaceOfDepartureCoordinate.value = '';
            clearPlaceOfArrivalCoordinate.value = '';
            clearAvailableSeats.value = '';
            

            // Hier kannst du die JSON-Daten an deinen Pfad senden, z. B. mit fetch()
            const response = await fetch('./api/drivus/rides/postRide', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            })
                .then(response => {
                    // Handle die Antwort hier
                    getPage(1, 7)
                    console.log("gehd")
                })
                .catch(error => {
                    // Handle Fehler hier
                    console.log("Hat nd funktioniert zum speichan")
                });
        } else{
            alert("invalid data!")
        }
        
    }
    private checkData() {
        let isValid: Boolean = true;

        // Überprüfe, ob der Abfahrtsort nicht null oder leer ist
        var departureInput = (this.shadowRoot.getElementById('abfort') as HTMLInputElement).value;

        if (!departureInput.trim() || departureInput.length <= 2) {
            //alert("Invalid departure location");
            //(document.getElementById('errorWrongInputNewRide') as HTMLInputElement).innerHTML = 'Please enter a valid departure location.';
            isValid = false;
        }

        /// Überprüfe, ob der Ankunftsort nicht null oder leer ist
        var arrivalInput = (this.shadowRoot.getElementById('ankort') as HTMLInputElement).value;

        if (!arrivalInput.trim() || arrivalInput.length <= 2) {
            //alert("Invalid arrival location");
            //(document.getElementById('errorWrongInputNewRide') as HTMLInputElement).innerHTML = 'Please enter a valid arrival location.';
            isValid = false;
        }

        //nach vergangenem Datum überprüfen und Datum auf null
        const selectedDate = (this.shadowRoot.getElementById('datum') as HTMLInputElement).value;
        const currentDate = new Date().toISOString().split('T')[0]; // Heutiges Datum

        if (selectedDate < currentDate || !selectedDate) {
            //(document.getElementById('errorWrongInputNewRide') as HTMLInputElement).innerHTML = 'Please enter a date that is not in the past.';
            isValid = false;
            //alert('Selected date cannot be in the past or null.');
        }

        //Überprüfe, ob die Zeit nicht null oder leer ist
        var timeInputValue = (this.shadowRoot.getElementById('abfzeit') as HTMLInputElement).value;

        if (!timeInputValue) {
            //(document.getElementById('errorWrongInputNewRide') as HTMLInputElement).innerHTML = 'Please enter a time.';
            isValid = false;
            //alert('Selected date cannot be in the past or null.');
        }
        return isValid;
    }
}

customElements.define("users-option", UsersOptionComponent)