import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/models/usuario';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: Usuario = new Usuario();

  constructor(private authSrv: AuthService) { }

  ngOnInit() {
  }

  registrar() {
    this.authSrv.onRegister(this.usuario);
  }

}
