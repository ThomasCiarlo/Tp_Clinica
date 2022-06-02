import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterEspecialistaComponent } from './form-register-especialista.component';

describe('FormRegisterEspecialistaComponent', () => {
  let component: FormRegisterEspecialistaComponent;
  let fixture: ComponentFixture<FormRegisterEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegisterEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegisterEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
