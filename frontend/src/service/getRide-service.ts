import { Ride, Model } from "Model/model"     
import {store} from "../model/model"

const RIDES_URL = "/api/getRide/2"

async function loadRide() {
    const response = await fetch(RIDES_URL)
    const ride: Ride = await response.json()
}
export {loadRide}
