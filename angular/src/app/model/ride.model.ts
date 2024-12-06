import {Timestamp} from 'rxjs';
import {DateTime} from 'luxon';

export interface Ride {
  id: number
  driver: string
  departureTime: Date
  placeOfDeparture: string
  placeOfArrival: string
  placeOfDepartureCoordinate?: string
  placeOfArrivalCoordinate?: string
  availableSeats: number
}

export interface BackendRide {
  id: number
  driver: string | null
  departureTime: DateTime
  placeOfDeparture: string
  placeOfArrival: string
  placeOfDepartureCoordinate?: string
  placeOfArrivalCoordinate?: string
  availableSeats: number
}

export interface RegisterRide {
  rideId: number,
  username: string
}
