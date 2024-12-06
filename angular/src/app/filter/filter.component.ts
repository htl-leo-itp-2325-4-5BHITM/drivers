import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  @Output() stateChangeFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

}
