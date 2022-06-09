import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormturnoComponent } from './formturno.component';

describe('FormturnoComponent', () => {
  let component: FormturnoComponent;
  let fixture: ComponentFixture<FormturnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormturnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
