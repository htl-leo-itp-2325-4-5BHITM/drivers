import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(private router: Router) {

  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  logedButton() {
    if (sessionStorage.getItem('loginValid') == "true"){
      console.log("eingellogged")
      this.router.navigate(['/account']);
    }else{
      console.log("noch nicht einglogged")
    }
  }
}
