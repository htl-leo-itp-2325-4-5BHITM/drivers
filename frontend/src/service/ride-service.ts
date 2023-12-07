import { Ride, Model } from "Model/model"     
import {store} from "../model/model"

const RIDES_URL = "/api/rides"

async function loadRides() {
    const response = await fetch(RIDES_URL)
    const rides: Ride[] = await response.json()
    const model: Model = {
        drives: rides
    }
    console.log("rides loaded", rides)
    store.next(model)
}
export {loadRides}