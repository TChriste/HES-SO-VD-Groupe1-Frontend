import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {ListeAttente} from './patient.model';
import {PatientService} from './patient.service';
import {avatar} from '../avatar';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  listesAttente: ListeAttente[];
  form: FormGroup;
  src: string;

  constructor(private formBuilder: FormBuilder, private patientService: PatientService) { }

  ngOnInit(): void {
    this.src =  'https://avataaars.io/?avatarStyle=Circle&topType=' + this.avatarRandom('topType') +
      '&accessoriesType=' + this.avatarRandom('accessoriesType') + '&hairColor=' + this.avatarRandom('hairColor') +
      '&facialHairType=' + this.avatarRandom('facialHairType') + '&clotheType=' + this.avatarRandom('clotheType') +
      '&eyeType=' + this.avatarRandom('eyeType') + '&eyebrowType=' + this.avatarRandom('eyebrowType') +
      '&mouthType=' + this.avatarRandom('mouthType') + '&skinColor=' + this.avatarRandom('skinColor');

    this.form = this.formBuilder.group({
      checkboxes: this.formBuilder.group({}),
    });

    this.patientService.getListesAttente().subscribe(data => {
      this.listesAttente = data;
      const checkboxes = this.form.get('checkboxes') as FormGroup;
      this.listesAttente.forEach((option: any) => {
        checkboxes.addControl(option.id, new FormControl(false));
      });
    });

    this.form.valueChanges.subscribe(value => console.log(value));
  }

  onSubmitFiltres(form: NgForm) {
    console.log(form);
  }

  onSubmitListeAttente() {
    const values = this.form.value.checkboxes;
    console.log(values);

    const idsListesSelectionnees = [];
    Object.entries(values).forEach(item => {
      const id = item[Object.keys(item)[0]];
      const checked = item[Object.keys(item)[1]];

      if (checked) {
        idsListesSelectionnees.push(id);
      }
    });
    console.log(idsListesSelectionnees);
  }

  avatarRandom(type: string) {
    return avatar[type][Math.floor(Math.random() * avatar[type].length)];
  }
}
