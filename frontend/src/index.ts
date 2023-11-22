import { loadRides } from "./service/ride-service"
import "./components/ride-table-component"
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
 
       <h1 id="form_headline">Change Ride</h1>
       <form id="form_head">
           <div class="table-input" id="form_label">
               <label for="datum">Date:</label>
               <label for="abfzeit">Departure Time:</label>
               <label for="abfort">Place of Departure:</label>
               <label for="ankort">Place of Arrival:</label>
               <label for="fplatz">Available seats:</label>
               <label for="fahrer">Driver:</label>
           </div>
           <div class="table-input">
               <input type="date" id="datum" name="datum">
               <input type="time" id="abfzeit" name="abfzeit">
               <input type="text" id="abfort" name="abfort">
               <input type="text" id="ankort" name="ankort">
               <input type="number" min="1" id="fplatz" name="fplatz">
               <input type="text" id="fahrer" name="fahrer">
           </div>
           <input type="submit" id="submit" name="senden" onclick="showList()">
       </form>
        <button id="backToTableBtn">back to rides</button>`;
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
    }
  }
  // start the app
  new AdminTS();
  new backToTable();