import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterAdminComponent } from './form-register-admin.component';

describe('FormRegisterAdminComponent', () => {
  let component: FormRegisterAdminComponent;
  let fixture: ComponentFixture<FormRegisterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegisterAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegisterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
