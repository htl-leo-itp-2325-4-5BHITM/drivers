import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRideViewComponent } from './driver-ride-view.component';

describe('DriverRideViewComponent', () => {
  let component: DriverRideViewComponent;
  let fixture: ComponentFixture<DriverRideViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverRideViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverRideViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
