import { Component } from '@angular/core';
import {Driver} from '../service/hardcode.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  driver!: Driver | undefined;

  protected readonly localStorage = localStorage;
  protected readonly sessionStorage = sessionStorage;
}
