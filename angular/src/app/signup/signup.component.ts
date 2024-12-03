import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    RouterLink,
    NgIf
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

  submitted = false;

  constructor(private userService: UserService) {
  }

  signup: FormGroup = new FormGroup({
    'firstname': new FormControl(null, Validators.required),
    'lastname': new FormControl(null, Validators.required),
    'phonenr': new FormControl(null, Validators.required),
    'username': new FormControl(null, Validators.required),
    'email': new FormControl(null,[Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
  })

  signupFunction(){
    console.log(FormGroup)
    console.log(this.firstName, this.lastName, this.phoneNumber, this.username)

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

    this.onSubmit()

    console.log('Saved')
    this.submitted = false
  }

  onSubmit(){
    this.submitted = true;

    if (this.signup.valid) {
      console.log('Login valid.');
    } else {
      console.error('Login not valid');
    }
  }

}
