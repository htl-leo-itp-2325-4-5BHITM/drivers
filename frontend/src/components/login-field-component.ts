import {DrivUser, Model, store, storeUsers} from "../model/model"
import {html, render} from "lit-html"
import { loadUsers, getUserData } from "../service/user-service"
import { loadRides } from "../service/ride-service"
import {RideTableComponent} from "./ride-table-component"
import {BehaviorSubject} from "rxjs"

class LoginComponent extends HTMLElement {
    connectedCallback() {
        console.log("Login loaded")
        storeUsers.subscribe(model => {
            console.log("data changed", model)
            this.render(model.drivUsers)
        })
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    render(users: DrivUser[]) {
        render(this.formTemplate(users), this.shadowRoot)
    }
    formTemplate(users: DrivUser[]) {
        const output = users.map(drivUser=>this.optionTemplate(drivUser))
        //w3-table-all
        return html`
        <link rel="stylesheet" href="./style/home.css">
        <form id="form_head">
                <div class="table-input" id="form_label">
                    
                    <label for="select_user">User</label><br>
                    <select id="fahrer" name="fahrer">
                        ${output}
                    </select><br><br>

                    <label for="password">Password</label><br>
                    <input type="password" id="password" name="password"><br><br>

                </div>
                <div class="table-input"></div>
                <input @click=${()=> this.submit()} type="button" id="submit" value="submit">
            </form>
            <div id="errorWrongInput"></div>`
    }
    optionTemplate(drivUser: DrivUser) {
        console.log("render user", drivUser)
        return html`
        <option value="${drivUser.firstName} ${drivUser.lastName}">${drivUser.firstName} ${drivUser.lastName}</option>
        `
    }
    private submit() {
        console.log("bin im submit");

        if(this.checkData()){
            let name = (this.shadowRoot.getElementById('fahrer') as HTMLInputElement).value;
            //let name = "";
            sessionStorage.setItem("username", name);
            sessionStorage.setItem("isLogedIn", "true");
            //NUR AUSPROBIER DINGSI -> FÜR TASKBAR WEG
            if (sessionStorage.getItem("isLogedIn") === "true") {
                // Create an instance of RideTableComponent
                const rideTable = new RideTableComponent();
                // Append the instance to the document body (or another desired location)
                document.body.appendChild(rideTable);

                // Subscribe to the store in RideTableComponent
                store.subscribe(model => {
                    console.log("data changed", model);
                    rideTable.render(model.drives, model.currentRide);
                });
                //DAMIT WORKTS
                loadRides();
            }


            console.log(sessionStorage.getItem("username"))
        }
        
    } 
    private checkData(){

        let isValid: Boolean = true;
        //passwort
        var driverInput = (this.shadowRoot.getElementById('password') as HTMLInputElement).value;

        // Überprüfen, ob user angemeldet ist

        if (sessionStorage.getItem("username").length == 0||sessionStorage.length==0) {
            (this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a username!';
            
        }
        // Überprüfe, ob der Passwort nicht null oder leer ist
        if (!driverInput.trim() || driverInput.length <= 2) {
            (this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Please enter a valid password!';
            isValid = false;
        }else{
            (this.shadowRoot.getElementById('errorWrongInput') as HTMLElement).innerHTML = 'Log In worked';
        }
        

        
   
        
    
        return isValid;
      }

}

customElements.define("login-field", LoginComponent)