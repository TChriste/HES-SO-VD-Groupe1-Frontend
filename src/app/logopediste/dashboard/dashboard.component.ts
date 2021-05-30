import { Component, OnInit } from '@angular/core';
import {LogopedisteService} from '../logopediste.service';
import {LoginService} from '../../login/login.service';
import {StatisticsModel} from '../logopediste.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  statistics: StatisticsModel;

  constructor(private logopedisteService: LogopedisteService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.logopedisteService.getStatistics(this.loginService.user.value.id).subscribe(data => {
      this.statistics = data;
    });
  }

}
