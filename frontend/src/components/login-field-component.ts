import { DrivUser, Model, store, storeUsers } from "../model/model"
import { html, render } from "lit-html"
import { getUserData } from "../service/user-service"
import {loadRides} from "../service/ride-service";
import {RideTableComponent} from "./ride-table-component";

class LoginComponent extends HTMLElement {
    connectedCallback() {
        console.log("Login loaded")
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
        const output = users.map(drivUser => this.optionTemplate(drivUser))
        //w3-table-all
        return html`
        <link rel="stylesheet" href="./style/home.css">
        <div>
            <select id="fahrer" name="fahrer">
                ${output}
            </select><br><br>
            <input type="password" id="password" name="password"><br><br>
        </div>
                
        <div class="table-input"></div>

        <input @click=${() => this.submit()} type="button" id="submit" value="submit">
        <input @click=${() => this.logout()} type="button" id="logout" value="logout">
        <!--<input @click=${() => getUserData()} type="button" id="logout" value="getUser">-->
                
        <div id="errorWrongInput"></div>
        <div id="logedInWorked"></div>
        <div id="logedOutWorked"></div>`
    }
    optionTemplate(drivUser: DrivUser) {
        return html`
        <option value="${drivUser.firstName} ${drivUser.lastName}">${drivUser.firstName} ${drivUser.lastName}</option>
        `
    }
    private logout() {
        localStorage.removeItem("username");
        localStorage.setItem("isLogedIn", "false");
        console.log(localStorage.getItem("username"));
        (this.shadowRoot.getElementById('logedOutWorked') as HTMLElement).innerHTML = 'Log out worked';
        window.location.reload();
    }
    private submit() {
        console.log("bin im submit");

        let name = (this.shadowRoot.getElementById('fahrer') as HTMLInputElement).value;
        localStorage.setItem("username", name);
        if (this.checkData()) {
            let name = (this.shadowRoot.getElementById('fahrer') as HTMLInputElement).value;
            //let name = "";
            localStorage.setItem("username", name);
            localStorage.setItem("isLogedIn", "true");
            //NUR AUSPROBIER DINGSI -> FÜR TASKBAR WEG
            if (localStorage.getItem("isLogedIn") === "true" ) {//todo:überprüfen dass keine 3 anzeigen
                // Create an instance of RideTableComponent
                const rideTable = new RideTableComponent();
                // Append the instance to the document body (or another desired location)
                document.body.appendChild(rideTable);

                // Subscribe to the store in RideTableComponent
               store.subscribe(model => {
                    rideTable.render(model.drives, model.currentRide);
                });
                //DAMIT WORKTS
                loadRides();
            }
           console.log(localStorage.getItem("username"))
        } else {
            alert("invalid data")
        }
        window.location.reload();
    }
    private checkData() {

        let isValid: Boolean = true;
        //passwort
        var driverInput = (this.shadowRoot.getElementById('password') as HTMLInputElement).value;

        // Überprüfen, ob user angemeldet ist

        console.log(localStorage.getItem("username"));

        if (localStorage.length == 0 || localStorage.getItem("username").length == 0) {
            (this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a username!';
            isValid = false;
        }
        // Überprüfe, ob der Passwort nicht null oder leer ist
        if (!driverInput.trim() || driverInput.length <= 2) {
            (this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a valid password!';
            isValid = false;
        } else {
            (this.shadowRoot.getElementById('logedInWorked') as HTMLElement).innerHTML = 'Log In worked';
        }
        
        return isValid;
    }

}

customElements.define("login-field", LoginComponent)