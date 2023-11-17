import { loadRides } from "./service/ride-service"
import "./components/ride-table-component"
//import { render } from "./drive-table"
window.addEventListener("DOMContentLoaded", () => loaded())

async function loaded() {
    loadRides()
}