import { html, render } from "lit-html"
import { getUserDetails } from "../service/user-service";
import { Ride, storeUserDetails, ModelUserDetail, UserDetail } from "../model/model"
import { createNewUser } from "../service/user-service"; // Importiere die Funktion


export class UserDetailComponenet extends HTMLElement {

    connectedCallback() {
        console.log("details loaded");
        storeUserDetails
        .subscribe(model => {
            this.render(model.userDetails);
            
        })
    }

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    render(userDetails: UserDetail) {
        render(this.details(userDetails), this.shadowRoot)
        console.log(userDetails)
    }

    details(userDetails :UserDetail) {
        console.log("userDetails", userDetails)
        const details = userDetails
            
        return html`
            
            <button @click=${() => this.getDetails(details)} class="button-user-login">User</button>
            <!-- The Modal -->
            <link rel="stylesheet" href="./style/modal.css">
            <link rel="stylesheet" href="../style/register.css">
            <link rel="stylesheet" href="../style/default.css">
            <div id="ride-dialog">
                
                <div class="login-modal">
                    <span class="close" @click=${() => this.closeDialog()}>&times;</span>
                    <h1>Account Info</h1>
                    <p style="color: white" > ${details.firstName} </p><br>
                    <p>${details.lastName}</p><br>
                    <p>${details.email}</p>
                    <!--<button><a href="https://drivus.sytes.net/realms/drivus/protocol/openid-connect/logout">Logout</a></button>-->
                    <button><a href="http://localhost:4200/">Logout</a></button>

                    <button @click=${() => this.openRegistrationModal()}>Regist</button>

                    </div>
                </div>

                
                <div id="register-dialog">
                    <div class="login-field">
                            <span class="close" @click=${() => this.closeRegistrationDialog()}>&times;</span>
                            <h1>Register</h1>
                            <input id="firstName" type="text" placeholder="firstname" /><br />
                            <input id="lastName" type="text" placeholder="lastname" /><br />
                            <input id="phoneNr" type="text" placeholder="phonenumber" /><br />
                            <input id="emailAddress" type="text" placeholder="email" /><br />
                            <input id="username" type="text" placeholder="username" /><br />
                            <button id="button-submit-nre-user" @click=${() => this.submitRegistrationForm()}>Submit</button>
                        
                    </div>
                </div>

                <div id="input-missing-variable"></div>


            </div>`  
    }
    submitRegistrationForm() {
        const firstnameInput = this.shadowRoot.getElementById("firstName") as HTMLInputElement;
        const lastnameInput = this.shadowRoot.getElementById("lastName") as HTMLInputElement;
        const phonenumberInput = this.shadowRoot.getElementById("phoneNr") as HTMLInputElement;
        const emailInput = this.shadowRoot.getElementById("emailAddress") as HTMLInputElement;
        const usernameInput = this.shadowRoot.getElementById("username") as HTMLInputElement;

        if (emailInput && firstnameInput && lastnameInput && phonenumberInput && usernameInput) {
            const emailAddress = emailInput.value.trim();
            const firstName = firstnameInput.value.trim();
            const lastName = lastnameInput.value.trim();
            const phoneNr = phonenumberInput.value.trim();
            const username = usernameInput.value.trim();
    
            // Überprüfung, ob alle Felder ausgefüllt sind
            if (!firstName || !lastName || !phoneNr || !emailAddress || !username) {
                console.error("fill out all input fields");
                alert("please fill out all input fields")
                return;
            }
    
            console.log("Form Input:", firstName, lastName, phoneNr, emailAddress, username);
    
            // Übergabe der Eingabewerte an die createNewUser-Funktion
            createNewUser(firstName, lastName, phoneNr, emailAddress, username);
        } else {
            console.error("Eingabefelder konnten nicht gefunden werden.");
        }
       
    }
    
    closeDialog() {
        const dialog = this.shadowRoot.getElementById('ride-dialog')
        dialog.style.display = 'none'
    }
    private getDetails(details :UserDetail) {
        const dialog = this.shadowRoot.getElementById('ride-dialog')
        dialog.style.display = 'flex'
    }


    // Open the registration modal
    openRegistrationModal() {
        const regDialog = this.shadowRoot.getElementById("register-dialog");
        const rideDialog = this.shadowRoot.getElementById("ride-dialog");
    
        rideDialog.style.display = "none";  // Close the ride-dialog modal
        regDialog.style.display = "flex";   // Show the register-dialog modal
    }

    // Close the registration modal
    closeRegistrationDialog() {
        const regDialog = this.shadowRoot.getElementById("register-dialog");
        regDialog.style.display = "none";
    }




}



customElements.define("user-details", UserDetailComponenet)