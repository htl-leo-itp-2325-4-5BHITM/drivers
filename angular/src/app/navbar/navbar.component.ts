import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  link:string="login"
  LogedInText:string="Loged In";
  isLoggedIn:boolean=false;

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

/*
  logedButton() {
    if (sessionStorage.getItem('loginValid') == "true"){
      console.log("eingellogged")
      this.link="/account"

    }else{
      this.link="/login"
      console.log("noch nicht einglogged")
    }
  }
*/

  logedButton(event: Event) {
    if(sessionStorage.getItem('loginValid')=="true"){
      this.router.navigate(['account']);
    } else{
      this.router.navigate(['login']);
    }
    // Verhindert, dass der Klick sofort das Routing ausführt
    /*event.preventDefault();
    // Logik zur Aktualisierung des Links
    this.link = this.isLoggedIn ? '/account' : '/login';
    // Jetzt navigieren
    this.router.navigate([this.link]);*/
  }


}
