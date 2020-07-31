import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../shared/models/userlogin';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: UserLogin = new UserLogin();

  constructor(private auuthSrv: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auuthSrv.onLogin(this.user);
  }

}
