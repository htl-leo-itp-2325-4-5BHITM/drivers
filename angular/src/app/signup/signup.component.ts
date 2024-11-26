import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  username?: string;
  email?: string;
  password?: string;

  constructor(private userService: UserService) {
  }

  signup: FormGroup = new FormGroup({
    'firstname': new FormControl(),
    'lastname': new FormControl(),
    'phonenr': new FormControl(),
    'username': new FormControl(),
    'email': new FormControl(),
    'password': new FormControl()
  })

  signupFunction(){
    this.firstName=this.signup.get('firstname')?.value;
    this.lastName=this.signup.get('lastname')?.value;
    this.phoneNumber=this.signup.get('phonenr')?.value;
    this.email=this.signup.get('email')?.value;
    this.username=this.signup.get('username')?.value;
    this.password=this.signup.get('password')?.value;

    let newUser :User = <User>{};

    if (this.firstName != null) {
      newUser.firstName = this.firstName;
    }
    if (this.lastName != null) {
      newUser.lastName = this.lastName;
    }
    if (this.phoneNumber != null) {
      newUser.phoneNr = this.phoneNumber;
    }
    if (this.email != null) {
      newUser.emailAddress = this.email;
    }
    if (this.username != null) {
      newUser.username = this.username;
    }

    this.userService.createNewUser(newUser);

    console.log('Saved')
  }

}
