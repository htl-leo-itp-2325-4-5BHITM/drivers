import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Time} from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  seeFilters: boolean=false;
  @Output() stateChangeFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  from:string=""
  to:string=""
  date: Date = new Date();
  time: Date = new Date();

  filterOption: FormGroup = new FormGroup({
    'from': new FormControl(''),
    'to': new FormControl(''),
    'date': new FormControl(''),
    'time': new FormControl('')
  })

  filterFunction() {
    this.from=this.filterOption.get('from')?.value;
    this.to=this.filterOption.get('to')?.value;
    this.date=this.filterOption.get('date')?.value;
    this.time=this.filterOption.get('time')?.value;

    console.log(this.from, this.to, this.date, this.time)


  }

  toggleState() {
    this.seeFilters=false;
    this.stateChangeFilter.emit(this.seeFilters);
  }
}
