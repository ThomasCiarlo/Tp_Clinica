import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEspecialistaComponent } from './list-especialista.component';

describe('ListEspecialistaComponent', () => {
  let component: ListEspecialistaComponent;
  let fixture: ComponentFixture<ListEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
