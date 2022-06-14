import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarturnoComponent } from './cancelarturno.component';

describe('CancelarturnoComponent', () => {
  let component: CancelarturnoComponent;
  let fixture: ComponentFixture<CancelarturnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelarturnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
