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
            
            <button @click=${() => this.getDetails(details)}>user</button>
            <!-- The Modal -->
            <link rel="stylesheet" href="./style/modal.css">
            <link rel="stylesheet" href="../style/register.css">
            <div id="ride-dialog">
                
                <div id="modal-content">
                    <span class="close" @click=${() => this.closeDialog()}>&times;</span>
                    <p>${details.name}</p><br>
                    <p>${details.email}</p>
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