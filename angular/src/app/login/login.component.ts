import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import {UserService} from '../service/user.service'
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username?: string;
  password?: string;
  submitted = false;

  login: FormGroup = new FormGroup({
    'username': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required)
  })

  constructor(private userService: UserService,private router: Router) {
  }

  loginFunction(){
    this.username=this.login.get('username')?.value;
    this.password=this.login.get('password')?.value;

    this.userService.loginValid(this.password,this.username);

    this.onSubmit();
    this.submitted = false

    //this.router.navigate(['/rides']);
  }

  onSubmit(){
    this.submitted = true;

    if (this.login.valid) {
      console.log('Login valid.');
    } else {
      console.error('Login not valid');
    }
  }


}