import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ride} from '../model/ride.model';
import {User} from '../model/user.model';
import {Driver} from './hardcode.service';
import {async, Observable} from 'rxjs';

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

  async getUserDetailsForRide(username?: string): Promise<Driver | undefined> {
    try {
      const response = await this.http.post<User>(this.url + '/getUserByUsername', username).toPromise();

      // Überprüfe, ob die Antwort definiert ist, bevor du fortfährst
      if (response) {
        const user: Driver = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          phoneNr: parseInt(response.phoneNr),  // Wandelt die Telefonnummer in eine Zahl um
          emailAddress: response.emailAddress,
          username: response.username,
          password: response.password
        };

        return user; // Gebe den 'user' zurück, wenn alles OK ist
      } else {
        console.error('Die Antwort war undefined.');
        return undefined; // Falls keine Antwort vorliegt
      }
    } catch (error) {
      console.error('Fehler bei der Login-Anfrage:', error);
      return undefined;  // Im Fehlerfall wird 'undefined' zurückgegeben
    }
  }

  loginValid(username: string | undefined, password: string | undefined): Observable<boolean> {
    console.log(username)
    const body = { username, password };
    console.log(body)

    // Sende die Login-Daten an das Backend zur Überprüfung
    //console.log(this.http.post<boolean>(this.url + '/users/postLogIn', body))
    return this.http.post<boolean>(this.url + '/users/postLogIn', body);
  }

  // Optional: Registrierung von Benutzerdaten
  registerUser(username: string, password: string): void {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    console.log('Benutzerdaten erfolgreich gespeichert.');
  }

}
