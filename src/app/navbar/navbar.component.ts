import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  isLogged() {
    return this.loginService.user.pipe(take(1), map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return false;
    }));
  }


}