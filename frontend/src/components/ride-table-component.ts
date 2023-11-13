import {Drive, store} from "../model/model"

class RideTableComponent extends HTMLElement {
    connectedCallback() {
        console.log("RideTable loaded")
        store.subscribe(model => {
            console.log("data changed", model)
            this.render(model.drives)
        })
    }
    render(drives: Drive[]) {
        console.log("rides to render", drives)
    }
}
customElements.define("ride-table", RideTableComponent)