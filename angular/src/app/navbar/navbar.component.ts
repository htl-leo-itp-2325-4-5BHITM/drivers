import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isSelected:boolean=false;

  constructor(private router: Router) {
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  selectedLink: string = ''; // Default selected link

  selectLink(link: string) {
    this.selectedLink = link; // Update selected link
    console.log(link)
  }
}
