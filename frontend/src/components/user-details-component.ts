import { html, render } from "lit-html";
import { getUserDetails } from "../service/user-service";
import { Ride, storeUserDetails, ModelUserDetail, UserDetail } from "../model/model";
import { createNewUser } from "../service/user-service";
import { async } from "rxjs"; // Importiere die Funktion

export class UserDetailComponent extends HTMLElement {
    private loggedIn: boolean = false; // Verfolgung des Login-Status
    private userDetails: UserDetail | null = null; // Speichert die Benutzerdetails

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render(); // Initiales Rendern des Buttons
    }

    connectedCallback() {
        console.log("Details loaded");

        // Versuche, Benutzerdaten aus dem Local Storage zu lesen
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
            this.userDetails = JSON.parse(storedUserDetails); // Benutzerdaten aus dem Local Storage laden
            this.loggedIn = true; // Benutzer als eingeloggt markieren
            localStorage.setItem("isLogedIn", "true");
        }

        storeUserDetails.subscribe((model) => {
            this.render(model.userDetails);
        });

        this.render(this.userDetails); // Rendere die Benutzerdetails, wenn sie vorhanden sind
    }

    // Rendert den gesamten Inhalt basierend auf dem Login-Status
    render(userDetails: UserDetail | null = null) {
        this.userDetails = userDetails;
        render(this.getTemplate(), this.shadowRoot);
    }

    // Dynamisch generiertes Template, das den User Button und das Modal enthält
    getTemplate() {
        return html`
            <link rel="stylesheet" href="./style/modal.css">
            <link rel="stylesheet" href="../style/register.css">
            <link rel="stylesheet" href="../style/default.css">

            <!-- Der User Button, der immer sichtbar ist -->
            <button @click=${() => this.showDialog()} class="button-user-login">User</button>

            <!-- Modal, das angezeigt wird, wenn auf den Button geklickt wird -->
            <div id="ride-dialog" style="display:none;">
                <div class="login-modal">
                    <span class="close" @click=${() => this.closeDialog()}>&times;</span>
                    ${this.loggedIn ? this.getLoggedInTemplate() : this.getLoginTemplate()}
                </div>
            </div>

            <div id="register-dialog" style="display:none;">
                <div class="login-field">
                    <span class="close" @click=${() => this.closeRegistrationDialog()}>&times;</span>
                    <h1>Register</h1>
                    <input id="firstName" type="text" placeholder="First name" /><br />
                    <input id="lastName" type="text" placeholder="Last name" /><br />
                    <input id="phoneNr" type="text" placeholder="Phone number" /><br />
                    <input id="emailAddress" type="text" placeholder="Email" /><br />
                    <input id="username" type="text" placeholder="Username" /><br />
                    <button id="button-submit-new-user" @click=${() => this.submitRegistrationForm()}>Submit</button>
                </div>
            </div>

            <div id="input-missing-variable"></div>
        `;
    }

    // Template für den Login-Dialog
    getLoginTemplate() {
        return html`
            <h1>Account Login</h1>
            <input id="username-input" type="text" placeholder="Enter username" /><br />
            <button @click=${() => this.getDetails()}>Login</button>
            <button @click=${() => this.openRegistrationModal()}>Register</button>
        `;
    }

    // Template für den Dialog nach dem Login
    getLoggedInTemplate() {
        return html`
            <h1>Account Info</h1>
            <p style="color: white">${this.userDetails?.username}</p><br />
            <p>${this.userDetails?.firstName}</p><br />
            <p>${this.userDetails?.lastName}</p><br />
            <p>${this.userDetails?.emailAddress}</p><br />
            <p>${this.userDetails?.phoneNr}</p><br />
            <button @click=${() => this.handleLogout()}>Logout</button>
        `;
    }

    // Login-Logik: Fetch-Benutzerdetails vom Backend basierend auf Username
    async getDetails() {
        const usernameInput = this.shadowRoot.getElementById('username-input') as HTMLInputElement;
        const username = usernameInput?.value.trim();

        if (!username) {
            console.error('Username cannot be empty');
            return;
        }

        try {
            const response = await fetch('http://localhost:4200/api/drivus/getUserByUsername', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            const data = await response.json();
            console.log(data); // Zum Debuggen die Antwort in der Konsole ausgeben
            this.userDetails = data; // Benutzerdetails speichern
            this.loggedIn = true; // Benutzer als eingeloggt markieren
            localStorage.setItem("isLogedIn", "true");
            // Speichern der Benutzerdaten im Local Storage
            localStorage.setItem('userDetails', JSON.stringify(this.userDetails));

            this.render(this.userDetails); // Neu rendern, um die Benutzerdetails anzuzeigen
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Registrierung: Erstellen eines neuen Benutzers
    submitRegistrationForm() {
        this.loggedIn = true;
        localStorage.setItem("isLogedIn", "true");

        const firstNameInput = this.shadowRoot.getElementById("firstName") as HTMLInputElement;
        const lastNameInput = this.shadowRoot.getElementById("lastName") as HTMLInputElement;
        const phoneNrInput = this.shadowRoot.getElementById("phoneNr") as HTMLInputElement;
        const emailInput = this.shadowRoot.getElementById("emailAddress") as HTMLInputElement;
        const usernameInput = this.shadowRoot.getElementById("username") as HTMLInputElement;

        if (firstNameInput && lastNameInput && phoneNrInput && emailInput && usernameInput) {
            const firstName = firstNameInput.value.trim();
            const lastName = lastNameInput.value.trim();
            const phoneNr = phoneNrInput.value.trim();
            const emailAddress = emailInput.value.trim();
            const username = usernameInput.value.trim();

            if (!firstName || !lastName || !phoneNr || !emailAddress || !username) {
                console.error("Please fill out all input fields.");
                alert("Please fill out all input fields.");
                return;
            }

            createNewUser(firstName, lastName, phoneNr, emailAddress, username);

            // Eingabefelder nach Registrierung leeren
            firstNameInput.value = '';
            lastNameInput.value = '';
            phoneNrInput.value = '';
            emailInput.value = '';
            usernameInput.value = '';
        } else {
            console.error("One or more input fields could not be found.");
        }
    }

    // Logout-Logik: Setze Zustand zurück
    handleLogout() {
        this.loggedIn = false;
        localStorage.setItem("isLogedIn", "false");
        this.userDetails = null;

        // Lösche die Benutzerdaten aus dem Local Storage
        localStorage.removeItem('userDetails');

        this.render(); // Zurück zum Login-Template
    }

    // Öffne das Modal
    showDialog() {
        const dialog = this.shadowRoot.getElementById('ride-dialog');
        dialog.style.display = 'flex'; // Modal anzeigen
    }

    // Schließe das Modal
    closeDialog() {
        const dialog = this.shadowRoot.getElementById('ride-dialog');
        dialog.style.display = 'none'; // Modal verstecken
    }

    // Öffne das Registrierungsformular
    openRegistrationModal() {
        const regDialog = this.shadowRoot.getElementById("register-dialog");
        const rideDialog = this.shadowRoot.getElementById("ride-dialog");
        rideDialog.style.display = "none"; // Schließe Login-Dialog
        regDialog.style.display = "flex"; // Zeige Registrierungsdialog
    }

    // Schließe das Registrierungsformular
    closeRegistrationDialog() {
        const regDialog = this.shadowRoot.getElementById("register-dialog");
        regDialog.style.display = "none";
        const rideDialog = this.shadowRoot.getElementById("ride-dialog");
        rideDialog.style.display = "flex"; // Zeige Login-Dialog wieder an
    }
}

customElements.define("user-details", UserDetailComponent);
