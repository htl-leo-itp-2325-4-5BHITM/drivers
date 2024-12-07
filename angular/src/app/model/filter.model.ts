import {DateTime} from 'luxon';

export interface Filter {
  departureTime: DateTime
  placeOfDeparture: string
  placeOfArrival: string
}
