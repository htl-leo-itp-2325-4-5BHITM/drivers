import { loadRides } from "./service/ride-service"
import "./components/ride-table-component"
import {Ride,RidePost,store} from "./model/model"
import { DateTime } from 'luxon';

window.addEventListener("DOMContentLoaded", () => loaded())


async function loaded() {
    loadRides()
}

//sortieren
export function sortData(sorted: Boolean, column: String) {
    console.log("sortData fetch")
    fetch('http://localhost:4200/api/rides/getSortedRide/'+sorted+'/'+column, {
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

// Event-Handler für das Absenden des Formulars
document.getElementById('form_head').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
    console.log("bin im form")

    // Daten aus dem Formular erfassen
    var dateInputValue = ((document.getElementById('datum') as HTMLInputElement).value);
    var timeInputValue = (document.getElementById('abfzeit') as HTMLInputElement).value;

    const combinedDateTime = DateTime.fromFormat(`${dateInputValue}:${timeInputValue}`, 'yyyy-MM-dd:HH:mm');

    //Funktionaufruf von Daten überprüfen
    checkData();

    console.log("date",dateInputValue); // Überprüfe das Datumformat
    console.log("time",timeInputValue); // Überprüfe das Zeitformat
    console.log("combine",combinedDateTime); // Überprüfe das kombinierte Datum und die Zeit

    const formData: RidePost = {
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
            loadRides()
            console.log("gehd")
        })
        .catch(error => {
            // Handle Fehler hier
            console.log("Hat nd funktioniert zum speichan")
        });
});


//Input überprüfen
function checkData(){
        
    // Überprüfe, ob der Name nicht null oder leer ist
    var driverInput = (document.getElementById('fahrer') as HTMLInputElement).value;

    if (!driverInput.trim() || driverInput.length <= 2) {
        //alert("no name enterd");
        (document.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a valid driver name.';
    }

    // Überprüfe, ob der Abfahrtsort nicht null oder leer ist
    var departureInput = (document.getElementById('abfort') as HTMLInputElement).value;

    if (!departureInput.trim() || driverInput.length <= 2) {
        //alert("Invalid departure location");
        (document.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a valid departure location.';
    }

    // Überprüfe, ob der Ankunftsort nicht null oder leer ist
    var arrivalInput = (document.getElementById('ankort') as HTMLInputElement).value;

    if (!arrivalInput.trim() || arrivalInput.length <= 2) {
        //alert("Invalid arrival location");
        (document.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a valid arrival location.';
    }

    //nach vergangenem Datum überprüfen, Datum und die Zeit überprüfen auf null
    const selectedDate = (document.getElementById('datum') as HTMLInputElement).value;
    const currentDate = new Date().toISOString().split('T')[0]; // Heutiges Datum
    var timeInputValue = (document.getElementById('abfzeit') as HTMLInputElement).value;

    if (selectedDate < currentDate || !selectedDate || !timeInputValue) {
        (document.getElementById('errorWrongInput') as HTMLInputElement).innerHTML = 'Please enter a date that is not in the past.';
        //alert('Selected date cannot be in the past or null.');
    }

}