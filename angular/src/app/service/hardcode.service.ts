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
      "driver": "johndoe"
    },
    {
      "id": 2,
      "departureTime": new Date("2024-03-16T14:30:00.000Z"),
      "placeOfDeparture": "Chicago",
      "placeOfArrival": "Miami",
      "availableSeats": 2,
      "driver": "johndoe"
    },
    {
      "id": 3,
      "departureTime": new Date("2024-03-17T09:00:00.000Z"),
      "placeOfDeparture": "San Francisco",
      "placeOfArrival": "Seattle",
      "availableSeats": 4,
      "driver": "janesmith"
    },
    {
      "id": 4,
      "departureTime": new Date("2024-03-18T16:00:00.000Z"),
      "placeOfDeparture": "Houston",
      "placeOfArrival": "Dallas",
      "availableSeats": 1,
      "driver": "janesmith"
    },
    {
      "id": 5,
      "departureTime": new Date("2024-03-19T11:30:00.000Z"),
      "placeOfDeparture": "Phoenix",
      "placeOfArrival": "Las Vegas",
      "availableSeats": 5,
      "driver": "janesmith"
    }
  ]
  hardcodedDriver: Driver[] = [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "phoneNr": 1234567890,
      "emailAddress": "john.doe@example.com",
      "username": "johndoe",
      "password": "password123"
    },
    {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Smith",
      "phoneNr": 2345678901,
      "emailAddress": "jane.smith@example.com",
      "username": "janesmith",
      "password": "mypassword456"
    },
    {
      "id": 3,
      "firstName": "Alice",
      "lastName": "Johnson",
      "phoneNr": 3456789012,
      "emailAddress": "alice.johnson@example.com",
      "username": "alicej",
      "password": "alicepass789"
    },
    {
      "id": 4,
      "firstName": "Bob",
      "lastName": "Brown",
      "phoneNr": 4567890123,
      "emailAddress": "bob.brown@example.com",
      "username": "bobbrown",
      "password": "bobsecure123"
    },
    {
      "id": 5,
      "firstName": "Charlie",
      "lastName": "Davis",
      "phoneNr": 5678901234,
      "emailAddress": "charlie.davis@example.com",
      "username": "charlied",
      "password": "charliepass321"
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

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  phoneNr: number;
  emailAddress: string;
  username: string;
  password: string;
}
