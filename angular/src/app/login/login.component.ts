import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

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
    ReactiveFormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myControl = new FormControl<string | User>('');
  options: User[] = [
    { username: 'Mary', password: '', id: 1, firstName: '', lastName: '', phoneNr: '', emailAddress: '' },
    { username: 'Shelley', password: '', id: 2, firstName: '', lastName: '', phoneNr: '', emailAddress: '' },
    { username: 'Igor', password: '', id: 3, firstName: '', lastName: '', phoneNr: '', emailAddress: '' }
  ];
  filteredOptions: Observable<User[]>;

  login: FormGroup = new FormGroup({
    username: this.myControl,
    password: new FormControl(null, Validators.required)
  });

  loginError: boolean = false;
  showSuggestions: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.username;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: User): string {
    return user && user.username ? user.username : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.username.toLowerCase().includes(filterValue));
  }

  loginFunction() {
    const username = this.login.get('username')?.value? || this.login.get('username')?.value;
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
  }

  hideSuggestions(): void {
    setTimeout(() => this.showSuggestions = false, 100);
  }
}
