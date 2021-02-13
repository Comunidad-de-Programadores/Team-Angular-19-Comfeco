import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRecoveryPasswordComponent } from './navbar-recovery-password.component';

describe('NavbarRecoveryPasswordComponent', () => {
  let component: NavbarRecoveryPasswordComponent;
  let fixture: ComponentFixture<NavbarRecoveryPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarRecoveryPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarRecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
