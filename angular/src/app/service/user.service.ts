import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ride} from '../model/ride.model';
import {User} from '../model/user.model';
import {Driver} from './hardcode.service';

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

  getUserDetails(username?: string){
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

  getUserDetails2(username?: string):Driver|undefined{
    this.http.post<User>(this.url + '/getUserByUsername', username).subscribe((response) => {
      console.log(response)

        let user: Driver = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          phoneNr: parseInt(response.phoneNr),
          emailAddress: response.emailAddress,
          username: response.username,
          password: response.password
        };
        return user;
      },
      (error) => {
        console.error('Fehler bei der Login-Anfrage:', error);
      }
    );
    return undefined;
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
          this.getUserDetails(username);

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
