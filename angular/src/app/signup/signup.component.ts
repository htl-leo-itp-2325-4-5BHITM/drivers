import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    this.phoneNumber=this.signup.get('phonenumber')?.value;
    this.email=this.signup.get('email')?.value;
    this.username=this.signup.get('username')?.value;
    this.password=this.signup.get('password')?.value;

    console.log('Saved')
  }

}
