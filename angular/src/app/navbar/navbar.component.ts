import {Component, OnInit} from '@angular/core';
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
export class NavbarComponent implements OnInit{

  link:string="notconfigured"
  LogedInText:string="nbhbj In";

  constructor(private router: Router) {

  }

  ngOnInit() {
    console.log("im ng")
    if (sessionStorage.getItem('loginValid') == 'true') {
      this.LogedInText = "Account Info";
    } else {
      this.LogedInText = "Log In"
    }
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  logedButton() {
    if (sessionStorage.getItem('loginValid') == "true"){
      console.log("eingellogged")
      this.link="/account"
      //this.router.navigate(['/account']);

    }else{
      this.link="/login"
      //this.router.navigate(['/login'])
      console.log("noch nicht einglogged")
    }
  }
}
