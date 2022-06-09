import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoturnoComponent } from './nuevoturno.component';

describe('NuevoturnoComponent', () => {
  let component: NuevoturnoComponent;
  let fixture: ComponentFixture<NuevoturnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoturnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
