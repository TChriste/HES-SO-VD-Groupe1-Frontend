import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLogged = false;
  role: string;
  private userSub: Subscription;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.userSub = this.loginService.user.subscribe(user => {
      this.isLogged = !!user;
      this.role = user?.role;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  deconnexion() {
    this.isLogged = false;
    this.role = '';
    this.loginService.logout();
  }
}
