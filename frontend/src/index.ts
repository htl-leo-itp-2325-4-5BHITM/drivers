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
       <h1>Change Ride</h1>
        <form>
            <div class="table-input">
                <label for="datum">Date:</label><br>
                <input type="date" id="datum" name="datum"><br>
            </div>
            <div class="table-input">
                <label for="abfzeit">Departure Time:</label><br>
                <input type="time" id="abfzeit" name="abfzeit"><br>
            </div>
            <div class="table-input">
                <label for="abfort">Place of Departure:</label><br>
                <input type="text" id="abfort" name="abfort"><br>
            </div>
            <div class="table-input">
                <label for="ankort">Place of Arrival:</label><br>
                <input type="text" id="ankort" name="ankort"><br>
            </div>
            <div class="table-input">
                <label for="fplatz">Available seats:</label><br>
                <input type="number" min="1" id="fplatz" name="fplatz"><br>
            </div>
            <div class="table-input">
                <label for="fahrer">Driver:</label><br>
                <input type="text" id="fahrer" name="fahrer"><br>
            </div>
            <input type="submit" id="submit" name="senden" onclick="showList()">
        </form>`;
    }
  }
  // start the app
  new AdminTS();