import { Component } from '@angular/core';
import {Driver} from '../service/hardcode.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  driver!: Driver | undefined;

  protected readonly localStorage = localStorage;
  protected readonly sessionStorage = sessionStorage;

  constructor(private router: Router) {
  }

  LogUserOut() {
    sessionStorage.setItem('loginValid','false');
    this.router.navigate(['/']);
  }
}
