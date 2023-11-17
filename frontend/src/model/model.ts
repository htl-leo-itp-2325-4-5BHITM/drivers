import {BehaviorSubject} from "rxjs"

interface Ride {
    driver: string
    departureTime: string
    placeOfDeparture: string
}

interface RideResponse {
    data: Ride[]
}

export interface Model {
    drives: Ride[]
}

const initialState: Model = {
    drives: []
}

const store = new BehaviorSubject<Model>(initialState)

export { Ride, RideResponse as DriveResponse, store }

/*
const demoData: Drive[] = [
    {
        firstname: "Andrei",
        lastname: "Brehar",
        deppTime: "10:15",
        deppPlace: "Traun",
        arrPlace: "Pettenbach",
        seetings: 4
    },
    {
        firstname: "Romana",
        lastname: "Schned",
        deppTime: "05:30",
        deppPlace: "Walding",
        arrPlace: "Linz",
        seetings: 4
    },
    {
        firstname: "Tuana",
        lastname: "Sevik",
        deppTime: "07:15",
        deppPlace: "Linz",
        arrPlace: "Traun",
        seetings: 3
    },
    {
        firstname: "Janine",
        lastname: "Wenninger",
        deppTime: "15:30",
        deppPlace: "Leonding",
        arrPlace: "Linz",
        seetings: 1
    },
    {
        firstname: "Natalie",
        lastname: "Schmitzberger",
        deppTime: "20:40",
        deppPlace: "Linz",
        arrPlace: "Thening",
        seetings: 3
    },
    {
        firstname: "Robert",
        lastname: "Schmitzberger",
        deppTime: "23:40",
        deppPlace: "Linz",
        arrPlace: "Thening",
        seetings: 1
    },
    {
        firstname: "Karina",
        lastname: "Berger",
        deppTime: "02:00",
        deppPlace: "Linz",
        arrPlace: "Pettenbach",
        seetings: 4
    },
    {
        firstname: "Marco",
        lastname: "Leitner",
        deppTime: "12:00",
        deppPlace: "Ottensheim",
        arrPlace: "Marchtrenk",
        seetings: 3
    }

]
// const model: Model = {
//     drives: demoData
// }*/
