import {BehaviorSubject} from "rxjs"
import { DateTime } from 'luxon';
export {RidePost} from "./ride-post"
export {FilterData} from "./rides-filtered"
export {RegisterData} from "./ride-register"
export {RideCount} from "./ride-count"


interface Ride {
    id: number
    driver: string
    departureTime: DateTime
    placeOfDeparture: string
    placeOfArrival: string
    placeOfDepartureCoordinates?: string
    placeOfArrivalCoordinates?: string
    availableSeats: number
}

export interface RideResponse {
    data: Ride[]
}

export interface Model {
    drives: Ride[]
    currentRide?: Ride 
    ridesCount: number
}

const initialState: Model = {
    drives: [],
    ridesCount: 0
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
