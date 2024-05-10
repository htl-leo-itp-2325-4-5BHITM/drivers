import { html, render } from "lit-html"
import { getUserDetails } from "../service/user-service";
import { Ride, storeUserDetails, ModelUserDetail, UserDetail } from "../model/model"


export class UserDetailComponenet extends HTMLElement {

    connectedCallback() {
        console.log("details loaded");
        storeUserDetails
        .subscribe(model => {
            this.render(model.userDetails);
            console.log(model.userDetails)
        })
    }

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    render(userDetails: UserDetail[]) {
        render(this.details(userDetails), this.shadowRoot)
    }

    details(userDetails :UserDetail[]) {
        //getUserDetails()
        //const details = userDetails.map(details => this.getDetails(details))
        console.log(userDetails)
        //if(userDetails.length != undefined && userDetails.length > 0) {
            const details = userDetails
            console.log(userDetails.length)
            return html`
            <button>user</button>
           
            `
            //<!--<button @click=${() => this.getDetails(details)}>user</button>-->
            //<p>${details[1].name}</p>
        //}
        /*return html`
            <p>not working</p>`*/
        
        
    }
    getDetails(details :UserDetail) {
        //getUserDetails()
        console.log("in details")
        return html`
        <h3>geht</h3>
        `
        console.log("danach")
    }

}

customElements.define("user-details", UserDetailComponenet)