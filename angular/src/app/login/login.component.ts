import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
import { CommonModule } from '@angular/common';  // Füge dies hinzu
//import {MatAutocompleteModule} from '@angular/material/autocomplete';

export interface User {
  username: string;
  password: string;
  id: number;
  firstName: string;
  lastName: string;
  phoneNr: string;
  emailAddress: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    CommonModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myControl = new FormControl<string | User>('');

  username?: string;
  password?: string;
  submitted = false;

  showSuggestions: boolean = false;
  allUsernames: string[] = ['andrei', 'romana', 'janine', 'natalie']; // Beispiel Benutzernamen
  filteredSuggestions: string[] = [];
  highlightedIndex: number = -1;

  //filteredOptions: Observable<User[]>;

  login: FormGroup = new FormGroup({
    username: this.myControl,
    password: new FormControl(null, Validators.required)
  });

  loginError: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  /*ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.username;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }*/

  /*displayFn(user: User): string {
    return user && user.username ? user.username : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.username.toLowerCase().includes(filterValue));
  }

  loginFunction() {
    const username = this.login.get('username')?.value || this.login.get('username')?.value;
    const password = this.login.get('password')?.value;

    if (username && password) {
      this.userService.loginValid(username, password).subscribe(valid => {
        if (valid) {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('isloged', 'true');
          this.userService.getUserDetails(username);
          this.router.navigate(['/rides']);
          this.loginError = false;
        } else {
          this.loginError = true;
        }
      });
    }
  }*/

  onUsernameInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    if (input.length > 0) {
      /*this.filteredSuggestions = this.allUsernames
        .filter(user => user.username.toLowerCase().includes(filterValue.toLowerCase()));*/

      this.filteredSuggestions = this.allUsernames.filter(username =>
        username.toLowerCase().startsWith(input.toLowerCase())
      );
      this.showSuggestions = this.filteredSuggestions.length > 0;
      this.highlightedIndex = -1;
    } else {
      this.showSuggestions = false;
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' && this.highlightedIndex < this.filteredSuggestions.length - 1) {
      this.highlightedIndex++;
    } else if (event.key === 'ArrowUp' && this.highlightedIndex > 0) {
      this.highlightedIndex--;
    } else if (event.key === 'Shift') {
      //this.selectSuggestion(this.filteredSuggestions[this.highlightedIndex]);
    }
  }

  /*onKeydown(event: KeyboardEvent): void {
    if (this.showSuggestions && this.filteredSuggestions.length > 0) {
      if (event.key === 'ArrowDown') {
        // Mit Pfeiltaste nach unten navigieren
        this.highlightedIndex = (this.highlightedIndex + 1) % this.filteredSuggestions.length;
      } else if (event.key === 'ArrowUp') {
        // Mit Pfeiltaste nach oben navigieren
        this.highlightedIndex = (this.highlightedIndex > 0 ? this.highlightedIndex : this.filteredSuggestions.length) - 1;
      } else if (event.key === 'Shift') {
        // Umschalttaste wurde gedrückt
        if (this.highlightedIndex >= 0) {
          this.selectSuggestion(this.filteredSuggestions[this.highlightedIndex]);
        }
      }
    }
  }*/

  /*selectSuggestion(suggestion: string): void {
    this.login.get('username')?.setValue(suggestion);
    this.showSuggestions = false;
  }*/
  selectSuggestion(username: string): void {
    console.log("Selected suggestion:", username);
    this.login.get('username')?.setValue(username);
    this.showSuggestions = false;
  }




  hideSuggestions(): void {
    setTimeout(() => this.showSuggestions = false, 100); // Verzögerung, um Klick auf Vorschlag zu erfassen
  }

  loginFunction() {
    this.username = this.login.get('username')?.value;
    this.password = this.login.get('password')?.value;

    console.log("getting valid or invalid " + this.submitted);

    let isValid = this.userService.loginValid(this.username, this.password).subscribe(valid => {
      if (valid) {
        console.log('Login successful');
        console.log("loginVR VOR SUBMITTED:", sessionStorage.getItem('loginValid'));
        this.submitted = sessionStorage.getItem('loginValid') === 'true';
        console.log("SUBMITTED:", this.submitted);

        console.log("submitted soida true sei " + this.submitted);

        console.log('Login valid.');

        console.log("submitted " + this.submitted);

        sessionStorage.setItem('username', <string>this.username);
        sessionStorage.setItem('isloged', String(valid));
        this.userService.getUserDetails(<string>this.username);
        this.router.navigate(['/rides']);

        this.loginError = false;
      } else {
        console.log('Invalid credentials');
        console.error('Login not valid');
        console.log("submitted " + this.submitted);
        this.loginError = true;
      }
    });
  }
}
