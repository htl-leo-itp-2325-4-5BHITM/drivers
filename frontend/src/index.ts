import { loadRides } from "./service/ride-service"
import "./components/ride-table-component"
import {Ride,store} from "./model/model"
import { DateTime } from 'luxon';

//import { render } from "./drive-table"
window.addEventListener("DOMContentLoaded", () => loaded())



async function loaded() {
    loadRides()
}

class AdminTS {
    constructor() {
      let table = document.getElementById("test");
      table.addEventListener("click", (e:Event) => this.changeData());
    }
    changeData(){
       // button click handler
       document.getElementById("ride-finder-tab").innerHTML = `
 
       <h1 id="form_headline_change_ride">Change Ride</h1>
       <form id="form_head_change_ride">
           <div class="table-input-change-ride">
               <label for="datum" class="label_change_ride">Date:</label>
               <label for="abfzeit" class="label_change_ride">Departure Time:</label>
               <label for="abfort" class="label_change_ride">Place of Departure:</label>
               <label for="ankort" class="label_change_ride">Place of Arrival:</label>
               <label for="fplatz" class="label_change_ride">Available seats:</label>
               <label for="fahrer" class="label_change_ride">Driver:</label>
           </div>
           <div class="table-input-change-ride">
               <input type="date" id="datum" name="datum">
               <input type="time" id="abfzeit" name="abfzeit">
               <input type="text" id="abfort" name="abfort">
               <input type="text" id="ankort" name="ankort">
               <input type="number" min="1" id="fplatz" name="fplatz">
               <input type="text" id="fahrer" name="fahrer">
           </div>
           <input type="submit" id="submit" name="senden" <!--onclick="showList()"-->>
       </form>
        <button id="backToTableBtn">back to rides</button>`;
        new backToTable();
    }
  }
  // start the app
 


  class backToTable {
    constructor() {
      let btn = document.getElementById("backToTableBtn");
      btn.addEventListener("click", (e:Event) => this.showTable());
    }
    showTable(){
       // button click handler
       document.getElementById("ride-finder-tab").innerHTML = `
       <h1 id="headline-table">Available Rides</h1>
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
               <tr id="test">
                   <td>Date</td>
                   <td>Departure Time</td>
                   <td>Place of Departure</td>
                   <td>Place of Arrival</td>
                   <td>Available seats</td>
                   <td>Driver</td>
               </tr>
           </tbody>
       </table>
       <button id="backToTableBtn">back to rides</button>`;
       new AdminTS();
    }
  }
  // start the app
  new AdminTS();
  new backToTable();



// Hier werden Typen definiert, die zu deinen Formulardaten passen


// Event-Handler für das Absenden des Formulars
document.getElementById('form_head').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
    console.log("bin im form")

    // Daten aus dem Formular erfassen
    var dateInputValue = (document.getElementById('datum') as HTMLInputElement).value;
    var timeInputValue = (document.getElementById('abfzeit') as HTMLInputElement).value;

    const combinedDateTime = DateTime.fromFormat(`${dateInputValue}T${timeInputValue}`, 'yyyy-MM-ddTHH:mm');
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

    // Hier kannst du die JSON-Daten an deinen Pfad senden, z. B. mit fetch()
    fetch('http://localhost:4200/rides/postRide', {
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
            console.log("Hat nd funktioniert zum speichan")
        });
});
