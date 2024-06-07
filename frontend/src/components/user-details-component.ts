import { html, render } from "lit-html"
import { getUserDetails } from "../service/user-service";
import { Ride, storeUserDetails, ModelUserDetail, UserDetail } from "../model/model"


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
            
            <button @click=${() => this.getDetails(details)} class="button-user-login">user</button>
            <!-- The Modal -->
            <link rel="stylesheet" href="./style/modal.css">
            <link rel="stylesheet" href="../style/register.css">
            <link rel="stylesheet" href="../style/default.css">
            <div id="ride-dialog">
                
                <div id="modal-content">
                    <span class="close" @click=${() => this.closeDialog()}>&times;</span>
                    <h1>Account Info</h1>
                    <p>${details.firstName} </p><br>
                    <p>${details.lastName} - </p><br>
                    <p>${details.email}</p>
                    <button><a href="https://drivus.sytes.net/realms/drivus/protocol/openid-connect/logout">Logout</a></button>
                    </div>
                </div>
            </div>`  
    }
    closeDialog() {
        const dialog = this.shadowRoot.getElementById('ride-dialog')
        dialog.style.display = 'none'
    }
    private getDetails(details :UserDetail) {
        const dialog = this.shadowRoot.getElementById('ride-dialog')
        dialog.style.display = 'flex'
    }
}

customElements.define("user-details", UserDetailComponenet)