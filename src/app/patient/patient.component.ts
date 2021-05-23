import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {ListeAttente, Specialisation} from './patient.model';
import {PatientService} from './patient.service';
import {avatar} from '../avatar';
import {SpecialisationService} from '../specialisation/specialisation.service';
import {DemandeSuiviComponent} from './demande-suivi/demande-suivi.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, AfterViewInit {
  @ViewChild(DemandeSuiviComponent) demandeSuiviComponent: DemandeSuiviComponent;

  specialisations: Specialisation[];
  specialisationSelected: Specialisation;

  listesAttente: ListeAttente[];
  form: FormGroup;
  src: string;

  idsListesSelectionnees = [];
  isModalActive: boolean;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private specialisationService: SpecialisationService) { }

  ngOnInit(): void {
    this.isModalActive = false;
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
    this.specialisationSelected = null;
    this.specialisationService.getSpecialisations().subscribe( resData => {
      this.specialisations = resData;
    });
  }

  ngAfterViewInit() {
    this.form.addControl('form', this.demandeSuiviComponent.form);
    this.demandeSuiviComponent.form.setParent(this.form);
  }

  onSubmitFiltres(form: NgForm) {
    console.log(form);
  }

  onSuivant() {
    const values = this.form.value.checkboxes;
    Object.entries(values).forEach(item => {
      const id = parseInt(item[Object.keys(item)[0]]);
      const checked = item[Object.keys(item)[1]];

      if (checked) {
        this.idsListesSelectionnees.push(id);
      }
    });
    this.isModalActive = true;
  }

  valueChangeModalActive(value: boolean) {
    this.isModalActive = value;
  }

  avatarRandom(type: string) {
    return avatar[type][Math.floor(Math.random() * avatar[type].length)];
  }
}
