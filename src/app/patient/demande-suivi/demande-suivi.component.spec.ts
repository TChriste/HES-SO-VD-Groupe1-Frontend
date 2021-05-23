import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeSuiviComponent } from './demande-suivi.component';

describe('DemandeSuiviComponent', () => {
  let component: DemandeSuiviComponent;
  let fixture: ComponentFixture<DemandeSuiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeSuiviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
