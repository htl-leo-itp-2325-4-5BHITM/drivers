import { Ride, store, Model } from "../model/model"
import { html, render } from "lit-html"
import { DateTime } from 'luxon'
//import { sortData } from "../index"
import { getCount, getSorted } from "../service/ride-service"
import { loadRides, getSeat, removeSeat, getFiltered, getPage } from "../service/ride-service"
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import L, { map, latLng, tileLayer, MapOptions, marker, LatLngExpression } from "leaflet";
import { filter } from "rxjs"
//import 'leaflet/dist/leaflet.css';

// für Sortierung
let lastSortedColumn: String | null = null;
let isAscendingOrder = true;
let dateValue = ''; // Standardwerte für Datum und Zeit
let timeValue = '';
let ridesPerPage = 7

export class RideTableComponent extends HTMLElement {
    connectedCallback() {
        store.pipe(
            filter(model=> !!model.drives && !!model.currentRide)
        )
        .subscribe(model => {
            this.render(model.drives, model.currentRide, model.ridesCount);
            // lodt mid dem ois endlos
            //loadRides();
            //getCount();
            console.log(model.drives)
        })

        const filterInput = this.shadowRoot.getElementById("filterText") as HTMLInputElement;
        filterInput.addEventListener("input", async () => {
            const filterText = filterInput.value;
            if (filterText == "") {
                getPage(1, ridesPerPage)
            } else {
                await getFiltered(filterText, 1);
            }
        });
    }
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    render(rides: Ride[], currentRide?: Ride, ridesCount?: number) {
        render(this.tableTemplate(rides, currentRide, ridesCount), this.shadowRoot)
    }
    rowTemplate(ride: Ride) {
        // Departure Time in DateTime-Objekt umwandeln
        const departureTime = DateTime.fromISO(ride.departureTime);
        // Zeit und Datum separat formatieren
        const formattedTime = departureTime.toFormat('HH:mm'); // Zeit formatieren (z.B. 10:30)
        const formattedDate = departureTime.toFormat('dd.MM.yyyy'); // Datum formatieren (z.B. 2023-11-22)

        console.log(ride.placeOfDepartureCoordinate)

        //https://www.openstreetmap.org/#map=14/48.2929/14.2725
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
                        <button class="table-setting-button"  class="setting-setting" @click=${() => this.map(ride)}><img src="../../img/map.png" class="map-icon"></button>       
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
                                <!--<button @click=${() => getFiltered((this.shadowRoot.getElementById('filterText') as HTMLInputElement).value, 1)}>
                                    <img src="" ./img/magnifying_glass.png>
                                </button>-->
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
                        
                        
                        <h3>Edit Ride</h3>
                        <form id="form-head-change">

                            <div id="edit-ride-image"></div>

                                
                                    <div class="grid-item">
                                        <input type="text" id="abfort" name="abfort"
                                               value='${currentRide?.placeOfDeparture}'>
                                    </div>

                                    <div class="grid-item">
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
                            <div class="register-button-center">
                                <input @click=${() => this.saveChanges(currentRide?.id)} type="button" id="edit-submit"
                                       value="save">
                                <input @click=${() => this.removeRide(currentRide?.id)} type="button" id="edit-remove"
                                       value="remove">
                            </div>    
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
        const words = dateAndTime.split(/[T.]/);
        const date = words[0];
        const time = words[1];

        const model = Object.assign({}, store.getValue())
        model.currentRide = ride
        store.next(model)
        const dialog = this.shadowRoot.getElementById('ride-dialog')
        dialog.style.display = 'flex'
    }
    private rowsButtons(ride: Ride) {
        if (ride.driver == localStorage.getItem("username")) {
            return html`
                <button class="table-setting-button"  class="setting-setting" @click=${() => this.rowClick(ride)}><img src="./img/gear.png" width="15vw"></button>       
            `
        } else if (localStorage.getItem("isLogedIn") == "false") {
            return html` 
                <button class="table-setting-button" @click=${() => alert("Please log in to get a seat!")}><img src="./img/plus_inactive.png" width="15vw"></button>
                <button class="table-setting-button" class="setting-minus" @click=${() => alert("Please log in to get a seat!")}><img src="./img/minus_inactive.png" width="15vw"></button>
               `
        } else {
            return html`
                <button class="table-setting-button" @click=${() => getSeat(ride)}><img src="./img/plus_inactive.png" width="15vw"></button>
                <button class="table-setting-button" class="setting-minus" @click=${() => removeSeat(ride)}><img src="./img/minus_inactive.png" width="15vw"></button>
                `
        }
    }

    mapInstance
    private map(ride: Ride) {
        
        if(ride.placeOfDepartureCoordinate != null && ride.placeOfArrivalCoordinate != null) {
            var depCo = ride.placeOfDepartureCoordinate.split(',');
            var deplatlng = L.latLng(parseFloat(depCo[0]), parseFloat(depCo[1]));
            console.log(deplatlng)

            var arrCo = ride.placeOfArrivalCoordinate.split(',');
            var arrlatlng = L.latLng(parseFloat(arrCo[0]), parseFloat(arrCo[1]));

            const options: MapOptions = {
                center: latLng((deplatlng.lat + arrlatlng.lat) / 2, (deplatlng.lng + arrlatlng.lng) / 2),
                zoom: 10,
            };
            
            if(this.mapInstance) {
                this.mapInstance.off();
                this.mapInstance.remove();
            }
            
            this.mapInstance = map('map', options);
           

            tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, { //style URL
                tileSize: 512,
                zoomOffset: -1,
                minZoom: 1,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                crossOrigin: true
            }).addTo(this.mapInstance);

            marker(deplatlng).addTo(this.mapInstance);
            marker(arrlatlng).addTo(this.mapInstance);
        } 
    }
    private paginationNav(count: number) {
        let selectedPage = 0
        //getCount();
        let ridesCount = count;


        let string = []

        for (let i = 0; i <= ridesCount / ridesPerPage; i++) {
            string.push(html`<p @click=${() => getPage(i + 1, ridesPerPage)}>${i + 1}</p>`)
        }



        return html`
        <div class="pagination">
            <p>Back</p>
            ${string}
            <p>Next</p>
        </div>`

        renderPage(0)
 
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
        }
        
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
    }
    private saveChanges(id: number) {
        var url = "http://localhost:4200/api/drivus/rides/changeRide"

        var driv = localStorage.getItem("username");
        // Daten aus dem Formular erfassen
        var dateInputValue = (this.shadowRoot.getElementById('datum') as HTMLInputElement).value;
        var timeInputValue = (this.shadowRoot.getElementById('abfzeit') as HTMLInputElement).value;

        const combinedDateTime = DateTime.fromFormat(`${dateInputValue}:${timeInputValue}`, 'yyyy.MM.dd:HH:mm');

        //this.checkData();
        if (this.checkData()) {

            const formData: Ride = {
                id: id,
                driver: localStorage.getItem("username"),
                departureTime: combinedDateTime,
                placeOfDeparture: (this.shadowRoot.getElementById('abfort') as HTMLInputElement).value,
                placeOfArrival: (this.shadowRoot.getElementById('ankort') as HTMLInputElement).value,
                availableSeats: parseInt((this.shadowRoot.getElementById('fplatz') as HTMLInputElement).value)
            };
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
                    getPage(1, ridesPerPage)
                    this.closeDialog()
                })
                .catch(error => {
                    // Handle Fehler hier
                    console.error("error: ", error)
                });
        } else {
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
                getPage(1, ridesPerPage)
                this.closeDialog()
            })
            .catch(error => {
                // Handle Fehler hier
                console.error("Hat nd funktioniert zum Ändern ", error)
            });
    }

    private sortData(sorted: Boolean, column: String) {
        fetch('http://localhost:4200/api/drivus/rides/getSortedRide/' + sorted + '/' + column + '/', {
            method: 'GET',
        })
            .then(response => {
                // Handle die Antwort hier
            })
            .catch(error => {
                // Handle Fehler hier
                console.error("Hat nd funktioniert zum speichan", error)
            });
    }

    //Input überprüfen
    private checkData() {

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