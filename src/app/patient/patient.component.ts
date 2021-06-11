import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {ListeAttente, PageListeAttente, Specialisation} from './patient.model';
import {PatientService} from './patient.service';
import {SpecialisationService} from '../specialisation/specialisation.service';
import {DemandeSuiviComponent} from './demande-suivi/demande-suivi.component';
import {RegionModel} from '../region/region.model';
import {RegionService} from '../region/region.service';
import * as moment from 'moment';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, AfterViewInit {
  @ViewChild(DemandeSuiviComponent) demandeSuiviComponent: DemandeSuiviComponent;

  isLoading = false;
  regionIsLoading = false;
  specialisationIsLoading = false;
  page: number;

  specialisations: Specialisation[];
  specialisationSelected: Specialisation;

  regions: RegionModel[];
  regionSelected: RegionModel;

  listesAttentePage: PageListeAttente;
  listesAttenteComplete: PageListeAttente;
  form: FormGroup;

  idsListesSelectionnees = [];
  isModalActive: boolean;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private specialisationService: SpecialisationService,
              private regionService: RegionService) { }

  ngOnInit(): void {
    this.isModalActive = false;
    this.page = 0;

    this.form = this.formBuilder.group({
      checkboxes: this.formBuilder.group({}),
    });
    this.loadListeAttentes();
    this.specialisationSelected = null;
    this.specialisationIsLoading = true;
    this.specialisationService.getSpecialisations().subscribe( resData => {
      this.specialisations = resData;
      this.specialisationIsLoading = false;
    });

    this.regionSelected = null;
    this.regionIsLoading = true;
    this.regionService.getRegions().subscribe( resData => {
      this.regions = resData;
      this.regionIsLoading = false;
    });
  }

  private loadListeAttentes() {
    this.isLoading = true;
    this.patientService.getListesAttente(this.page, this.regionSelected, this.specialisationSelected).subscribe(data => {
      this.listesAttentePage = data;
      this.isLoading = false;
      this.listesAttenteComplete = data;
      const checkboxes = this.form.get('checkboxes') as FormGroup;
      this.listesAttentePage.listeAttente.forEach((option: any) => {
        checkboxes.addControl(option.id, new FormControl(false));
      });
    });
  }

  ngAfterViewInit() {
    this.form.addControl('form', this.demandeSuiviComponent.form);
    this.demandeSuiviComponent.form.setParent(this.form);
  }

  onSubmitFiltres(form: NgForm) {
    this.page = 1;
    this.loadListeAttentes();
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

  calculProchaineDispo(jours: number) {
    return moment(new Date(), 'DD-MM-YYY').add(jours, 'days').toDate();
  }

  counter(i: number) {
    return new Array(i);
  }

  changePage(page: number) {
    this.page = page;
    this.loadListeAttentes();
  }
}
