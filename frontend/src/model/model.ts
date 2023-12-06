import {BehaviorSubject} from "rxjs"
import { DateTime } from 'luxon';


interface Ride {
    driver: string
    departureTime: DateTime
    placeOfDeparture: string
    placeOfArrival: string
    availableSeats: number
}


interface RideResponse {
    data: Ride[]
}

export interface Model {
    drives: Ride[]
    currentRide?: Ride 
}

const initialState: Model = {
    drives: []
}

export interface Model2 {
    drive: Ride
}




const store = new BehaviorSubject<Model>(initialState)

export { Ride, RideResponse as DriveResponse, store }
