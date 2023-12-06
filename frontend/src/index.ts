import { loadRides } from "./service/ride-service"
import "./components/ride-table-component"
import "./components/change-ride-component"
import {Ride,store} from "./model/model"
import { DateTime } from 'luxon';

window.addEventListener("DOMContentLoaded", () => loaded())


async function loaded() {
    loadRides()
}

/*
class Update {
    constructor() {
      let btn = document.getElementById("changeDataBtn");
      btn.addEventListener("click", (e:Event) => this.changeData());
    }
    changeData(){
        
        document.getElementById("ride-finder-tab").innerHTML = `
        <form id="form_head_select_ride">
            <div class="table-input-change-ride">
                <label for="fahrer" class="label_change_ride">Select id of ride to change:</label>
            </div>
            <div class="table-input-change-ride">
                <input type="text" id="fahrer" name="fahrer">
            </div>
            <input type="submit" id="submit" name="senden">
        </form>`;
        createEventListenerForChanging()
    }
  }
 
new Update();*/


// Event-Handler für das Absenden des Formulars
document.getElementById('form_head').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
    console.log("bin im form")

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
    console.log("form Data JSON: "+jsonData)

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
            console.log("gehd")
        })
        .catch(error => {
            // Handle Fehler hier
            console.log("Hat nd funktioniert zum speichan")
        });
});





function createEventListenerForChanging() {
    var element = document.getElementById('form_head_select_ride')
    if (element) {
        console.log("eventlistener")
        // Event-Handler für das Abfragen der Fahrt die man ändern möchte
        var element = document.getElementById('form_head_select_ride')
        element.addEventListener('submit', function(event) {
            event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
            console.log("bin im form")

            // Fahrer aus dem Formular erfassen
            //var driver = (document.getElementById('fahrer') as HTMLInputElement).value

            var testId = (document.getElementById('fahrer') as HTMLInputElement).value

            console.log("form Data: "+testId)

            var url = "http://localhost:4200/api/rides/getRide/2"
            console.log(url)

            // Hier kannst du die JSON-Daten an deinen Pfad senden, z. B. mit fetch()
            fetch(url, {
                method: 'GET',
            })
                .then(response => {
                    // Handle die Antwort hier
                    console.log("gehd")
                })
                .catch(error => {
                    // Handle Fehler hier
                    console.log("Hat nd funktioniert zum anzeigen")
                });
            element.innerHTML = " <change-ride></change-ride>";


            document.getElementById('form_head_change_ride').addEventListener('submit', function(event) {
                event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
                    
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
                element.innerHTML = "Hopefully the information is right this time!";
            });
        });
    } else {
            console.log("doesnt exist");
    }
}


export function saveChanges() {
    console.log("change data")
}
    document.getElementById('form_head_change').addEventListener('submit', function(event) {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
        console.log("bin im form")
    /*
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
        console.log("form Data JSON: "+jsonData)
    
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
                console.log("gehd")
            })
            .catch(error => {
                // Handle Fehler hier
                console.log("Hat nd funktioniert zum speichan")
            });*/
    });
    //event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
        
    /*var url = "http://localhost:4200/api/rides/changeRide"
    console.log(url)

    // Daten aus dem Formular erfassen
    var dateInputValue = ((document.getElementById('datum') as HTMLInputElement).value);
    var timeInputValue = (document.getElementById('abfzeit') as HTMLInputElement).value;

    const combinedDateTime = DateTime.fromFormat(`${dateInputValue}:${timeInputValue}`, 'yyyy-MM-dd:HH:mm');

    console.log("date",dateInputValue); // Überprüfe das Datumformat
    console.log("time",timeInputValue); // Überprüfe das Zeitformat
    console.log("combine",combinedDateTime); // Überprüfe das kombinierte Datum und die Zeit

    const formData: Ride = {
        driver: (document.getElementById('change_fahrer') as HTMLInputElement).value,
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
    //element.innerHTML = "Hopefully the information is right this time!";*/
