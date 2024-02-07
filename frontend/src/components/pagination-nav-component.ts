import { DrivUser, Model, Ride,  store, storeUsers } from "../model/model"
import { html, render } from "lit-html"
import { loadUsers, getUserData } from "../service/user-service"
import { loadRides } from "../service/ride-service"
import { RideTableComponent } from "./ride-table-component"
import { BehaviorSubject } from "rxjs"
import { DateTime } from 'luxon'
import { sortData } from "../index"


class PaginationComponent extends HTMLElement {
    connectedCallback() {
        console.log("Login loaded")
        store.subscribe(model => {
            console.log("data changed", model)
            //NUR AUSPROBIER DINGSI
            this.render(model.drives);
            // lodt mid dem ois endlos
            //loadRides();
        })
    }
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    render(drives: Ride[]) {
        render(this.navTemplate(drives), this.shadowRoot)
    }
    navTemplate(rides: Ride[]) {
        const rows = rides.map(ride => this.pageTemplate(ride))
        //w3-table-all
        return html`
        <p>test</p>
        <p>${rows}</p>`
    }
    pageTemplate(ride: Ride) {
        return html`
        <p>zeile</p>
        `
    }

}

customElements.define("pagination-nav", PaginationComponent)