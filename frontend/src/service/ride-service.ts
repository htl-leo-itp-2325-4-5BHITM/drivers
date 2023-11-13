/*import { Drive, Model } from "Model/model"      //-> woher??
import {store} from "../model/model"

const EVENTS_URL = "http://localhost:8080/rides"

async function loadRides() {
    const response = await fetch(EVENTS_URL)
    const drives: Drive[] = await response.json()
    const model: Model = {
        drives
    }
    store.next(model);
}
export {loadRides}*/