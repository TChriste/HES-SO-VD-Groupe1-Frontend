import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInLogopedisteComponent } from './sign-in-logopediste.component';

describe('LoginComponent', () => {
  let component: SignInLogopedisteComponent;
  let fixture: ComponentFixture<SignInLogopedisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInLogopedisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInLogopedisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
