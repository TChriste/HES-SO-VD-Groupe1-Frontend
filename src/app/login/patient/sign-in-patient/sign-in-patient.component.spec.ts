import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInPatientComponent } from './sign-in-patient.component';

describe('LoginComponent', () => {
  let component: SignInPatientComponent;
  let fixture: ComponentFixture<SignInPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
