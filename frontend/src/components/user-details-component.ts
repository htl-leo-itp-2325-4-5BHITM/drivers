import { html, render } from "lit-html"

export class UserDetailComponenet extends HTMLElement {

    connectedCallback() {
        console.log("details loaded");
        this.render()
    }

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    render() {
        render(this.details(), this.shadowRoot)
    }
   
    details() {
        return html`
            <p>test</p>
            `
    }

}

customElements.define("user-details", UserDetailComponenet)