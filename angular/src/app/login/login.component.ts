import {Component, NgModule} from '@angular/core';
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
  loginError: boolean = false;


  constructor(private userService: UserService,private router: Router) {
  }

  loginFunction(){

    this.username=this.login.get('username')?.value;
    this.password=this.login.get('password')?.value;


    console.log("getting valid or invalid "+ this.submitted)


    let isValid = this.userService.loginValid(this.username, this.password).subscribe(valid => {
      if(valid) {
        console.log('Login successful');
        console.log("loginVR VOR SUBMITTED:",sessionStorage.getItem('loginValid'))
        this.submitted = sessionStorage.getItem('loginValid') === 'true';
        console.log("SUBMITTED:",this.submitted)

        //if (this.submitted) {
        console.log("submitted soida true sei " + this.submitted)

        console.log('Login valid.');

        console.log("submitted " + this.submitted)


        sessionStorage.setItem('username', <string>this.username);
        sessionStorage.setItem('isloged', String(valid));
        this.userService.getUserDetails(<string>this.username);
        this.router.navigate(['/rides']);

        this.loginError = false;

        //alert("richitg i guess")
      }
      else {
        console.log('Invalid credentials');
        console.error('Login not valid');
        console.log("submitted " + this.submitted)
        this.loginError = true
      }
    })

  }
}
