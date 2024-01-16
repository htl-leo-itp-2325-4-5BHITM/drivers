import {DrivUser, storeUsers} from "../model/model"
import {html, render} from "lit-html"
import { loadUsers } from "../service/user-service"


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
        <!--<link rel="stylesheet" href="../../style/register.css">-->
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
            </form>`
    }
    optionTemplate(drivUser: DrivUser) {
        console.log("render user", drivUser)
        return html`
        <option value="${drivUser.firstName} ${drivUser.lastName}">${drivUser.firstName} ${drivUser.lastName}</option>
        `
    }
    private submit() {
        console.log("bin im submit");
        let name = (this.shadowRoot.getElementById('fahrer') as HTMLInputElement).value;
        sessionStorage.setItem("username", name);
        console.log(sessionStorage.getItem("username"))
    } 
}

customElements.define("login-field", LoginComponent)