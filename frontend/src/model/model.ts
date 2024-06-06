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
    placeOfDepartureCoordinate?: string
    placeOfArrivalCoordinate?: string
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

export interface UserDetail {
    firstName: string,
    lastName: string,
    email: string
}

export interface ModelUserDetail {
    userDetails: UserDetail
}
const initialStateUserDetail: ModelUserDetail = {
    userDetails: {
        firstName: "",
        lastName: "",
        email: ""
    }
}

export interface ModelUser {
    drivUsers: DrivUser[]
}
const initialStateUser: ModelUser = {
    drivUsers: []
}


const store = new BehaviorSubject<Model>(initialState)
const storeUsers = new BehaviorSubject<ModelUser>(initialStateUser)
const storeUserDetails = new BehaviorSubject<ModelUserDetail>(initialStateUserDetail)

export { Ride, DrivUser, RideResponse as DriveResponse, store, storeUsers, storeUserDetails}
