import {Ride, store} from "../model/model"
import {html, render} from "lit-html"
import { DateTime } from 'luxon'
//import {saveChanges} from "../index"
import { loadRides } from "../service/ride-service"



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
        console.log("table template:" , rides)
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
                        <th  @click=${()=>this.sortRides("departurePlace")}>Place of Departure</th>
                        <th  @click=${()=>this.sortRides("arrivalPlace")}>Place of Arrival</th>
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
            <span id="close-button" @click=${()=> this.closeDialog()} class="w3-button w3-display-topright">&times;</span>
                <h2>Change data</h2>
                <form id="form_head_change">
                    <div class="table-input" id="form_label2">
                        <label for="fahrer">Driver</label><br>
                        <input type="text" id="change_fahrer" name="fahrer" value='${currentRide?.driver}'><br><br>

                        <label for="abfort">From</label><br>
                        <input type="text" id="abfort" name="abfort" value='${currentRide?.placeOfDeparture}'><br><br>

                        <label for="ankort">To</label><br>
                        <input type="text" id="ankort" name="ankort" value='${currentRide?.placeOfArrival}'><br><br>

                        <label for="change_datum">Date</label><br>
                        <input type="date" id="change_datum" name="change_datum"><br><br>

                        <label for="abfzeit">Departure Time:</label><br>
                        <input type="time" id="abfzeit" name="abfzeit"><br><br>

                        <label for="fplatz">Available seats:</label><br>
                        <input type="number" min="1" id="fplatz" name="fplatz" value='${currentRide?.availableSeats}'><br><br>
                    </div>
                    <input @click=${()=> this.saveChanges(currentRide?.id)} type="button" id="submit" value="save">

                    <input @click=${()=> this.removeRide(currentRide?.id)} type="button" id="remove" value="remove">

                    <p @click=${()=>{
                        //@ts-ignore
                        console.log(document.querySelector("#change_fahrer").value)
                        console.log(document.querySelector("#change_fahrer"))
                    }}>content</p>
                </form>
            </div>
        </div>
        </div>
    ` //<input type="submit" id="submit" name="save">
    //<button @click=${()=> this.saveChanges()}>save</button>
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
        alert(`Column ${column} for sort selected`)
        console.log("in sortRides")
    }
    private getSeat(column: String) {
        alert(`Column ${column} for sort selected`)
        console.log("you took a seat")
    }
    private saveChanges(id: number) {
        
        //event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
            
        var url = "http://localhost:4200/api/rides/changeRide"
        //console.log(url)
        
        var driv = (this.shadowRoot.getElementById('change_fahrer') as HTMLInputElement);
        console.log(driv);
        console.log(driv.value);

        /*let dings = document.querySelector("#change_fahrer") as HTMLInputElement;
        console.log(dings, dings.value);*/
        
        

        // Daten aus dem Formular erfassen
        var dateInputValue = (this.shadowRoot.getElementById('change_datum') as HTMLInputElement).value;
        var timeInputValue = (this.shadowRoot.getElementById('abfzeit') as HTMLInputElement).value;
        console.log(dateInputValue)
    
        const combinedDateTime = DateTime.fromFormat(`${dateInputValue}:${timeInputValue}`, 'yyyy-MM-dd:HH:mm');
    
        console.log("date",dateInputValue); // Überprüfe das Datumformat
        console.log("time",timeInputValue); // Überprüfe das Zeitformat
        console.log("combine",combinedDateTime); // Überprüfe das kombinierte Datum und die Zeit
    
        const formData: Ride = {
            id: id,
            driver: (this.shadowRoot.getElementById('change_fahrer') as HTMLInputElement).value,
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
        //element.innerHTML = "Hopefully the information is right this time!";
        
        //
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
    
}

customElements.define("ride-table", RideTableComponent)