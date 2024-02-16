import {BehaviorSubject} from "rxjs"
import { DateTime } from 'luxon';
export {RidePost} from "./ride-post"
export {FilterData} from "./rides-filtered"
export {RegisterData} from "./ride-register"


interface Ride {
    id: number
    driver: string
    departureTime: DateTime
    placeOfDeparture: string
    placeOfArrival: string
    availableSeats: number
}

export interface RideResponse {
    data: Ride[]
}

export interface Model {
    drives: Ride[]
    currentRide?: Ride 
}

const initialState: Model = {
    drives: []
}


// Users
interface DrivUser {
    id: number,
    firstName: string,
    lastName: string,
    phoneNr: string,
    emailAddress: string
}

export interface ModelUser {
    drivUsers: DrivUser[]
}
const initialStateUser: ModelUser = {
    drivUsers: []
}


const store = new BehaviorSubject<Model>(initialState)
const storeUsers = new BehaviorSubject<ModelUser>(initialStateUser)

export { Ride, DrivUser, RideResponse as DriveResponse, store, storeUsers}
