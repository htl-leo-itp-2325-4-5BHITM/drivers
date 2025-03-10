import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {RideViewComponent} from './ride-view/ride-view.component';
import {RideRegisterViewComponent} from './ride-register-view/ride-register-view.component';
import {AboutComponent} from './about/about.component';
import {AccountComponent} from './account/account.component';
import {StatistiksComponent} from './statistiks/statistiks.component';

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'statistiks', component:StatistiksComponent},
  {path:'rides', component:RideViewComponent},
  {path: 'register', component:RideRegisterViewComponent},
  {path: 'about', component:AboutComponent},
  {path: 'account', component: AccountComponent}
];
