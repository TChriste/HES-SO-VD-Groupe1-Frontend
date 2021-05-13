import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogopedisteComponent } from './logopediste.component';

describe('LogopedisteComponent', () => {
  let component: LogopedisteComponent;
  let fixture: ComponentFixture<LogopedisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogopedisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogopedisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
