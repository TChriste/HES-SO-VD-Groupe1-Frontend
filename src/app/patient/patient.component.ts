import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {ListeAttente, Specialisation} from './patient.model';
import {PatientService} from './patient.service';
import {avatar} from '../avatar';
import {SpecialisationService} from '../specialisation/specialisation.service';
import {DemandeSuiviComponent} from './demande-suivi/demande-suivi.component';
import {RegionModel} from '../region/region.model';
import {RegionService} from '../region/region.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, AfterViewInit {
  @ViewChild(DemandeSuiviComponent) demandeSuiviComponent: DemandeSuiviComponent;

  specialisations: Specialisation[];
  specialisationSelected: Specialisation;

  regions: RegionModel[];
  regionSelected: RegionModel;

  listesAttente: ListeAttente[];
  listesAttenteComplete: ListeAttente[];
  form: FormGroup;

  idsListesSelectionnees = [];
  isModalActive: boolean;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private specialisationService: SpecialisationService,
              private regionService: RegionService) { }

  ngOnInit(): void {
    this.isModalActive = false;

    this.form = this.formBuilder.group({
      checkboxes: this.formBuilder.group({}),
    });

    this.patientService.getListesAttente().subscribe(data => {
      this.listesAttente = data;
      this.listesAttenteComplete = data;
      const checkboxes = this.form.get('checkboxes') as FormGroup;
      this.listesAttente.forEach((option: any) => {
        checkboxes.addControl(option.id, new FormControl(false));
      });
    });
    this.specialisationSelected = null;
    this.specialisationService.getSpecialisations().subscribe( resData => {
      this.specialisations = resData;
    });

    this.regionSelected = null;
    this.regionService.getRegions().subscribe( resData => {
      this.regions = resData;
    });
  }

  ngAfterViewInit() {
    this.form.addControl('form', this.demandeSuiviComponent.form);
    this.demandeSuiviComponent.form.setParent(this.form);
  }

  onSubmitFiltres(form: NgForm) {
    if (this.specialisationSelected && this.regionSelected) {
      this.listesAttente = this.listesAttenteComplete.filter(
        liste => (liste.logopediste.specialisations.some(specialisation => specialisation.id === this.specialisationSelected.id)) &&
                 (liste.logopediste.idRegion === this.regionSelected.id)
      );
    } else if (this.regionSelected) {
      this.listesAttente = this.listesAttenteComplete.filter(
        liste => (liste.logopediste.idRegion === this.regionSelected.id)
      );
    } else if (this.specialisationSelected) {
      this.listesAttente = this.listesAttenteComplete.filter(
        liste => (liste.logopediste.specialisations.some(specialisation => specialisation.id === this.specialisationSelected.id))
      );
    } else {
      this.listesAttente = this.listesAttenteComplete;
    }
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
}
