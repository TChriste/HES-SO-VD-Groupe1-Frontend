import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAttenteComponent } from './liste-attente.component';

describe('ListeAttenteComponent', () => {
  let component: ListeAttenteComponent;
  let fixture: ComponentFixture<ListeAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAttenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
