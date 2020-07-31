import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  usuarios: Observable<any>;

  constructor(private authSrv: AuthService, private firebaseSrv: FirebaseService) { }

  ngOnInit() {
    this.usuarios = this.firebaseSrv.getUsuarios();
    this.usuarios.subscribe(res => console.log(res));
  }

  logout() {
    this.authSrv.cerrarSesion();
  }

  trackByFn(index, obj) {
    return obj.uid;
  }

}
