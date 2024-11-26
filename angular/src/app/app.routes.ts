import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {RideViewComponent} from './ride-view/ride-view.component';
import {RideRegisterViewComponent} from './ride-register-view/ride-register-view.component';

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path:'rides', component:RideViewComponent},
  {path: 'register', component:RideRegisterViewComponent}
];
