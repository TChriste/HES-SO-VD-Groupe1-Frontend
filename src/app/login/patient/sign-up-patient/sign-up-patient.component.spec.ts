import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPatientComponent } from './sign-up-patient.component';

describe('SignUpPatientComponent', () => {
  let component: SignUpPatientComponent;
  let fixture: ComponentFixture<SignUpPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
