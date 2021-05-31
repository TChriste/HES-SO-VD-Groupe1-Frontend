import {Component, Input, OnInit} from '@angular/core';
import {StatisticsModel} from '../logopediste.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() statistics: StatisticsModel;

  constructor() { }

  ngOnInit(): void {
  }

}
