import {BehaviorSubject} from "rxjs"
import { DateTime } from 'luxon';

export {RidePost} from "./ride-post"

interface Ride {
    id: number
    driver: string
    departureTime: DateTime
    placeOfDeparture: string
    placeOfArrival: string
    availableSeats: number
}



interface RegisterData {
    rideId: number
    username: string
}
export interface FilterData {
    filterText: String
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

/*export interface Model2 {
    drive: Ride
}*/


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

export { Ride, DrivUser, RegisterData, RideResponse as DriveResponse, store, storeUsers}
