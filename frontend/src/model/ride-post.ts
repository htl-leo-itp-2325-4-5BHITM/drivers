import { DateTime } from 'luxon';

export interface RidePost {
    driver: string
    departureTime: DateTime
    placeOfDeparture: string
    placeOfArrival: string
    availableSeats: number
}