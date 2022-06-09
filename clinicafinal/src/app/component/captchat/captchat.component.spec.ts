import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchatComponent } from './captchat.component';

describe('CaptchatComponent', () => {
  let component: CaptchatComponent;
  let fixture: ComponentFixture<CaptchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
