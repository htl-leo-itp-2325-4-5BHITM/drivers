import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-ride-register-view',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './ride-register-view.component.html',
  styleUrl: './ride-register-view.component.css'
})
export class RideRegisterViewComponent {
  registerRide: FormGroup = new FormGroup({
  })

  registerRideFunction() {

  }
}
