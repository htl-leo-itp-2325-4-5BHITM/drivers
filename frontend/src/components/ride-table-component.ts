import { Ride, store, Model } from "../model/model"
import { html, render } from "lit-html"
import { DateTime } from 'luxon'
//import { sortData } from "../index"
import {getCount, getSorted} from "../service/ride-service"
import {loadRides, getSeat, removeSeat, getFiltered, getPage} from "../service/ride-service"
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

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
            this.render(model.drives, model.currentRide, model.ridesCount);
            // lodt mid dem ois endlos
            //loadRides();
        })

        const filterInput = this.shadowRoot.getElementById("filterText") as HTMLInputElement;
        filterInput.addEventListener("input", async () => {
            const filterText = filterInput.value;
            if(filterText==""){
                getPage(1)
            }else{
                await getFiltered(filterText);
            }
        });
    }
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    render(drives: Ride[], currentRide?: Ride, ridesCount?: number) {
        render(this.tableTemplate(drives, currentRide, ridesCount), this.shadowRoot)
    }
    rowTemplate(ride: Ride) {
        // Departure Time in DateTime-Objekt umwandeln
        const departureTime = DateTime.fromISO(ride.departureTime);
        // Zeit und Datum separat formatieren
        const formattedTime = departureTime.toFormat('HH:mm'); // Zeit formatieren (z.B. 10:30)
        const formattedDate = departureTime.toFormat('dd.MM.yyyy'); // Datum formatieren (z.B. 2023-11-22)

        console.log("render ride", ride)

        return html`
            <tr class="ride-finder-entry-row">
                <td>${formattedDate}</td>
                <td>${formattedTime}</td>
                <td>${ride.placeOfDeparture}</td>
                <td>${ride.placeOfArrival}</td>
                <td>${ride.driver}</td>
                <td>${ride.availableSeats}</td>
                <td>
                    <div class="table-settings">
                        ${this.rowsButtons(ride)}
                    </div>
                </td>
            </tr>
        `
    }
    tableTemplate(rides: Ride[], currentRide?: Ride, ridesCount?: number) {
        const rows = rides.map(ride => this.rowTemplate(ride))
        // Überprüfen, ob currentRide definiert ist und departureTime hat
        if (currentRide != null && 'departureTime' in currentRide) {
            // Umwandeln des Zeitstempels in ein DateTime-Objekt
            const departureTime = DateTime.fromISO(currentRide.departureTime);

            // Extrahieren von Datum und Zeit aus dem DateTime-Objekt
            dateValue = departureTime.toFormat('yyyy.MM.dd');
            timeValue = departureTime.toFormat('HH:mm');
        }

        return html`
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <link rel="stylesheet" href="./style/rideTable.css">

            <div id="ride-finder-table-tab">
                <table id="ride-finder-table" cellpadding="0">
                    <thead class="ride-finder-tablehead">
                    <tr>
                        <th @click=${() => this.sortRides("date")}>Date</th>
                        <th @click=${() => this.sortRides("departureTime")}>Time</th>
                        <th @click=${() => this.sortRides("placeOfDeparture")}>From</th>
                        <th @click=${() => this.sortRides("placeOfArrival")}>To</th>
                        <th @click=${() => this.sortRides("driver")}>Driver</th>
                        <th @click=${() => this.sortRides("availableSeats")}>Empty seats</th>
                        <th>
                            <div id="ride-search">
                                <input type="text" placeholder="Search" id="filterText">
                                <button @click=${() => getFiltered((this.shadowRoot.getElementById('filterText') as HTMLInputElement).value)}>
                                    <img src="" ./img/magnifying_glass.png>
                                </button>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    ${rows}
                    </tbody>
                </table>
                ${this.paginationNav(ridesCount)}
            </div>


            <!-- The Modal -->
            <link rel="stylesheet" href="./style/modal.css">
            <link rel="stylesheet" href="../style/register.css">
            <div id="ride-dialog">
                
                <div id="modal-content">
                    <span class="close" @click=${() => this.closeDialog()}>&times;</span>
                    <div id="edit-image"></div>
                    <div id="edit-content">
                        
                        
                        <h2>Edit Ride</h2>
                        <form id="form-head-change">

                            <div id="edit-ride-image"></div>
                            <div id="register-content">

                                <div class="table-input">
                                    <div class="grid-item">
                                        <input type="text" id="abfort" name="abfort"
                                               value='${currentRide?.placeOfDeparture}'>
                                    </div>

                                    <div class="gird-item">
                                        <input type="text" id="ankort" name="ankort"
                                               value='${currentRide?.placeOfArrival}'>
                                    </div>

                                    <div class="grid-item">
                                        <input type="date" id="datum" name="datum" value='${dateValue}'>
                                    </div>

                                    <div class="grid-item">
                                        <input type="time" id="abfzeit" name="abfzeit" value='${timeValue}'>
                                    </div>
                                    <div class="grid-item">
                                        <input type="number" min="1" id="fplatz" name="fplatz"
                                               value='${currentRide?.availableSeats}'>
                                    </div>
                                </div>
                                <input @click=${() => this.saveChanges(currentRide?.id)} type="button" id="submit"
                                       value="save">
                                <input @click=${() => this.removeRide(currentRide?.id)} type="button" id="remove"
                                       value="remove">

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
        dialog.style.display = 'flex'
        console.log("in rowclick")
    }
    private rowsButtons(ride :Ride) {
        if(ride.driver == localStorage.getItem("username")) {
            return html`
                <button class="table-setting-button"  class="setting-setting" @click=${() => this.rowClick(ride)}><img src="./img/gear.png" width="15vw"></button>       
            `
        }else if(localStorage.getItem("isLogedIn") == "false"){
            return html` 
                <button class="table-setting-button" @click=${() => alert("Please log in to get a seat!")}><img src="./img/plus_inactive.png" width="15vw"></button>
                <button class="table-setting-button" class="setting-minus" @click=${() => alert("Please log in to get a seat!")}><img src="./img/minus_inactive.png" width="15vw"></button>
               `
        }else {
            return html`
                <button class="table-setting-button" @click=${() => getSeat(ride)}><img src="./img/plus_inactive.png" width="15vw"></button>
                <button class="table-setting-button" class="setting-minus" @click=${() => removeSeat(ride)}><img src="./img/minus_inactive.png" width="15vw"></button>
                `
            }
    }

    private paginationNav(count: number) {
        console.log(count)

        const objectsPerPage = 7;
        let selectedPage = 0   
        getCount();
        let ridesCount = count;  

        
        let string = []
        
        for (let i = 0; i <= ridesCount/objectsPerPage; i++) {
            string.push(html`<p @click=${() => getPage(i+1)}>${i+1}</p>`)
        }

        

        return html`
        <div class="pagination">
            <p>&laquo;</p>
            ${string}
            <p>&raquo;</p>
        </div>`
        
       /* renderPage(0)

        function renderPage(number){
            selectedPage = number  
            return html`
                <span class="dots">••</span>
                ${selectedPage > 0 ? `<span class="swap" onclick="swapPage(-1)">${selectedPage}</span>` : `<span class="spacer"></span>`}
                <span class="page">${selectedPage +1}</span>
                ${selectedPage < ridesCount ? `<span class="swap" onclick="swapPage(1)">${selectedPage + 2}</span>` : `<span class="spacer"></span>`}
                <span class="dots">••</span>
            `
            
            /*let html = ""
            for (let i = selectedPage*objectsPerPage; i < selectedPage*objectsPerPage+objectsPerPage; i++) {
                    html += `<li>${i} ${i}</li>`
            }
            document.querySelector('.content').innerHTML = html*/
/*        }

        function swapPage(offset){
        renderPage(selectedPage + offset)
        }
        
        /*

        /*
        

        renderPage(0)

        function renderPage(number){
        selectedPage = number  
        document.querySelector(".pageselector").innerHTML = `
            <span class="dots">••</span>
            ${selectedPage > 0 ? `<span class="swap" onclick="swapPage(-1)">${selectedPage}</span>` : `<span class="spacer"></span>`}
            <span class="page">${selectedPage +1}</span>
            ${selectedPage < data.length ? `<span class="swap" onclick="swapPage(1)">${selectedPage + 2}</span>` : `<span class="spacer"></span>`}
            <span class="dots">••</span>
        `
        
        let html = ""
        for (let i = selectedPage*objectsPerPage; i < selectedPage*objectsPerPage+objectsPerPage; i++) {
                html += `<li>${i} ${data[i]}</li>`
        }
        document.querySelector('.content').innerHTML = html
        }

        function swapPage(offset){
        renderPage(selectedPage + offset)
        }
        */
        

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
        getSorted(isAscendingOrder, lastSortedColumn)
        console.log("in sortRides")
    }
    private saveChanges(id: number) {
        var url = "http://localhost:4200/api/drivus/rides/changeRide"

        var driv = localStorage.getItem("username");
        console.log(driv);
        console.log(driv);

        // Daten aus dem Formular erfassen
        var dateInputValue = (this.shadowRoot.getElementById('datum') as HTMLInputElement).value;
        var timeInputValue = (this.shadowRoot.getElementById('abfzeit') as HTMLInputElement).value;
        console.log(dateInputValue)

        const combinedDateTime = DateTime.fromFormat(`${dateInputValue}:${timeInputValue}`, 'yyyy.MM.dd:HH:mm');
    
        //this.checkData();
        if(this.checkData()){

            console.log("date",dateInputValue); // Überprüfe das Datumformat
            console.log("time",timeInputValue); // Überprüfe das Zeitformat
            console.log("combine",combinedDateTime); // Überprüfe das kombinierte Datum und die Zeit
        
            const formData: Ride = {
                id: id,
                driver: localStorage.getItem("username"),
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
                    getPage(1)
                    this.closeDialog()
                    console.log("gehd")
                })
                .catch(error => {
                    // Handle Fehler hier
                    console.log("Hat nd funktioniert zum Ändern")
                });
        } else{
            alert("invalid data")
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
                getPage(1)
                this.closeDialog()
                console.log("gehd")
            })
            .catch(error => {
                // Handle Fehler hier
                console.log("Hat nd funktioniert zum Ändern")
            });
    }

    private sortData(sorted: Boolean, column: String) {
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

    //Input überprüfen
    private checkData(){

        let isValid: Boolean = true;

        // Überprüfe, ob der Name nicht null oder leer ist
        var driverInput = localStorage.getItem("username");

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
            //(this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a valid departure location.';
            isValid = false;
        }

        // Überprüfe, ob der Ankunftsort nicht null oder leer ist
        var arrivalInput = (this.shadowRoot.getElementById('ankort') as HTMLInputElement).value;

        if (!arrivalInput.trim() || arrivalInput.length <= 2) {
            //alert("Invalid arrival location");
            //(this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a valid arrival location.';
            isValid = false;
        }

        //nach vergangenem Datum überprüfen und Datum auf null
        const selectedDate = (this.shadowRoot.getElementById('datum') as HTMLInputElement).value;
        const currentDate = new Date().toISOString().split('T')[0]; // Heutiges Datum

        if (selectedDate < currentDate || !selectedDate) {
            //(this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a date that is not in the past.';
            isValid = false;
            //alert('Selected date cannot be in the past or null.');
        }

        //Überprüfe, ob die Zeit nicht null oder leer ist
        var timeInputValue = (this.shadowRoot.getElementById('abfzeit') as HTMLInputElement).value;

        if (!timeInputValue) {
            //(this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a time.';
            isValid = false;
            //alert('Selected date cannot be in the past or null.');
        }
    
        return isValid;
      }

    private getFilteredList() {
        var filterString = (this.shadowRoot.getElementById('filterText') as HTMLInputElement).value;

    }
}


customElements.define("ride-table", RideTableComponent)