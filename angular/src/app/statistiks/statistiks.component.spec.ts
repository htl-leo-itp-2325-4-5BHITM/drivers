import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiksComponent } from './statistiks.component';

describe('StatistiksComponent', () => {
  let component: StatistiksComponent;
  let fixture: ComponentFixture<StatistiksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
