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

export interface RegisterRide {
  rideId: number,
  username: string
}
