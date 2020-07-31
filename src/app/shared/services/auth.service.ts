import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../models/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { UserLogin } from '../models/userlogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line: max-line-length
  constructor(private afAuth: AngularFireAuth, private angularFirestore: AngularFirestore, private alertController: AlertController, private router: Router) { }

  // Registrar
  async onRegister(usuario: Usuario) {
    try{
      const pac = await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.contrasena);
      usuario.uid = pac.user.uid;
      const param = JSON.parse(JSON.stringify(usuario));
      this.angularFirestore.collection('usuarios').doc(pac.user.uid).set(param);
      return pac;
    } catch (error) {
      console.log('Error on register user', error);
      return error;
    }
  }

  // IniciarSesion
  async onLogin(user: UserLogin) {
    try{
      const us = await this.afAuth.signInWithEmailAndPassword(user.email, user.contrasena);
      this.router.navigateByUrl('inicio');
    } catch (error) {
      this.presentAlert(error.message);
    }
  }

  // Mostrar alertas
  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error al iniciar sesión',
      subHeader: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  cerrarSesion() {
    try{
      this.afAuth.signOut();
      this.router.navigateByUrl('login');
    } catch (error) {
      console.log(error);
    }

  }

}
