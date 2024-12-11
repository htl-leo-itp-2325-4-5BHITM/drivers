import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAllComponent } from './map-all.component';

describe('MapAllComponent', () => {
  let component: MapAllComponent;
  let fixture: ComponentFixture<MapAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
