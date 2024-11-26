import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ride} from '../model/ride.model';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/api/drivus/users"

  constructor(private http: HttpClient) { }

  createNewUser(user: User) {
    console.log("in createUser")
    console.log(user)

    this.http.post<User>(this.url + '/postUser', user).subscribe(user => {
      console.log('Updated user:', user);
    });

    //return this.http.post(this.url + "postUser/", user)
  }

}
