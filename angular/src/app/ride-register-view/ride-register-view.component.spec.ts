import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideRegisterViewComponent } from './ride-register-view.component';

describe('RideRegisterViewComponent', () => {
  let component: RideRegisterViewComponent;
  let fixture: ComponentFixture<RideRegisterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideRegisterViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
