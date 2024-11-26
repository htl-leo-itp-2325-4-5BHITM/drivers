import {Component, Input} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-ride-view',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './ride-view.component.html',
  styleUrl: './ride-view.component.css'
})
export class RideViewComponent {


  //@Input() isLoggedIn: boolean = false;

}
