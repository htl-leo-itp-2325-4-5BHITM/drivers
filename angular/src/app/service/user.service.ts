import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ride} from '../model/ride.model';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/api/drivus"

  constructor(private http: HttpClient) { }

  createNewUser(user: User) {
    console.log("in createUser")
    console.log(user)

    this.http.post<User>(this.url + '/users/postUser', user).subscribe(user => {
      console.log('Updated user:', user);
    });

    //return this.http.post(this.url + "postUser/", user)
  }

  getUserDetails(password?: String, username?: string){
    //const body = { username: username, password: password };

    this.http.post<User>(this.url + '/getUserByUsername', username).subscribe((response) => {
        let user: User = response;
        sessionStorage.setItem('firstname',user.firstName);
        sessionStorage.setItem('lastname',user.lastName);
        sessionStorage.setItem('username',user.username);
        sessionStorage.setItem('email',user.emailAddress);
        sessionStorage.setItem('phoneNr',user.phoneNr);
      },
      (error) => {
        console.error('Fehler bei der Login-Anfrage:', error);
      }
    );
  }

  loginValid(password?: String, username?: string ) : boolean {
    console.log("in loginValid");
    console.log("password:"+password+", username:"+username);

    let returnValidation = false;

    const body = { username: username, password: password };

    this.http.post<boolean>(this.url + '/users/postLogIn', body).subscribe((isValid: boolean) => {
        if (isValid) {
          console.log('Login erfolgreich!!!');
          sessionStorage.setItem('isloged','true');
          this.getUserDetails(password,username);

          console.log(returnValidation+" Value returned true")
          returnValidation = true;
        } else {
          console.log('Login fehlgeschlagen!!!');
          returnValidation = false
        }
      },
      (error) => {
        console.error('Fehler bei der Login-Anfrage:', error);
      }
    );
    console.log(returnValidation +" 2 return valtidation")
    return returnValidation;
  }

}
