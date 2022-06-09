import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioturnosComponent } from './calendarioturnos.component';

describe('CalendarioturnosComponent', () => {
  let component: CalendarioturnosComponent;
  let fixture: ComponentFixture<CalendarioturnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioturnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
