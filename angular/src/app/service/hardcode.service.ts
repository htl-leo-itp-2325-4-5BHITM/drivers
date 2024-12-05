import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodeService {

  hardcodedRide: Ride[]= [
    {
      "id": 1,
      "departureTime": new Date("2024-03-15T10:00:00.000Z"),
      "placeOfDeparture": "New York City",
      "placeOfArrival": "Los Angeles",
      "availableSeats": 3,
      "driver": "John Doe"
    },
    {
      "id": 2,
      "departureTime": new Date("2024-03-16T14:30:00.000Z"),
      "placeOfDeparture": "Chicago",
      "placeOfArrival": "Miami",
      "availableSeats": 2,
      "driver": "Jane Smith"
    },
    {
      "id": 3,
      "departureTime": new Date("2024-03-17T09:00:00.000Z"),
      "placeOfDeparture": "San Francisco",
      "placeOfArrival": "Seattle",
      "availableSeats": 4,
      "driver": "David Lee"
    },
    {
      "id": 4,
      "departureTime": new Date("2024-03-18T16:00:00.000Z"),
      "placeOfDeparture": "Houston",
      "placeOfArrival": "Dallas",
      "availableSeats": 1,
      "driver": "Emily Brown"
    },
    {
      "id": 5,
      "departureTime": new Date("2024-03-19T11:30:00.000Z"),
      "placeOfDeparture": "Phoenix",
      "placeOfArrival": "Las Vegas",
      "availableSeats": 5,
      "driver": "Michael Wilson"
    }
  ]

  constructor() { }
}

export interface Ride{
  id: number;
  departureTime: Date;
  placeOfDeparture: string;
  placeOfArrival: string;
  availableSeats: number;
  driver: string;
}
