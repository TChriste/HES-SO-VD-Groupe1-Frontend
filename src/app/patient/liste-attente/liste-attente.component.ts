import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-liste-attente',
  templateUrl: './liste-attente.component.html',
  styleUrls: ['./liste-attente.component.css']
})
export class ListeAttenteComponent implements OnInit {

  @Input() listeAttente: Object;

  constructor() { }

  ngOnInit(): void {
  }

}
