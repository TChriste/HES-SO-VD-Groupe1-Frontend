import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  role = '';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.user.pipe(take(1), map(user => {
      if (user) {
        this.role = user.role;
      }
    })).subscribe();
  }
}
