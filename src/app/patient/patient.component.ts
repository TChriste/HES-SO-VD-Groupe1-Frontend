import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  listesAttente: Object[];

  constructor() { }

  ngOnInit(): void {
    this.listesAttente = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ];
    console.log(this.listesAttente);
  }

  onSubmitFiltres(form: NgForm) {
    console.log(form);
  }

  onSubmitListeAttente(form: NgForm) {
    console.log(form);
  }
}
