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

  loginValid(password?: String, username?: string ){
    console.log("in loginValid");
    console.log("password:"+password+", username:"+username);

    const body = { username: username, password: password };

    this.http.post<boolean>(this.url + '/postLogIn', body).subscribe((isValid: boolean) => {
        if (isValid) {
          console.log('Login erfolgreich!!!');
        } else {
          console.log('Login fehlgeschlagen!!!');
        }
      },
      (error) => {
        console.error('Fehler bei der Login-Anfrage:', error);
      }
    );
  }

}
