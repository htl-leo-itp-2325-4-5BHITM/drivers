import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username?: string;
  password?: string;

  login: FormGroup = new FormGroup({
    'username': new FormControl(),
    'password': new FormControl()
  })

  loginFunction(){
    this.username=this.login.get('username')?.value;
    this.password=this.login.get('password')?.value;
  }



}
