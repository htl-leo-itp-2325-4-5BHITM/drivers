import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from "@angular/router";
import {UserService} from '../service/user.service'
@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink
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

  constructor(private userService: UserService) {
  }

  loginFunction(){
    this.username=this.login.get('username')?.value;
    this.password=this.login.get('password')?.value;

    this.userService.loginValid(this.password,this.username);

  }



}
