import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {RouterOutlet,RouterLink} from '@angular/router';


@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class LoginPage {
  user = { email: '', password: '' };

  constructor(private router: Router) {}

  loginUser() {
  let usersDB = JSON.parse(localStorage.getItem('usersDB') || '[]');
  const foundUser = usersDB.find((u: any) => u.email === this.user.email && u.password === this.user.password);

  if (foundUser) {
    localStorage.setItem('userProfile', JSON.stringify(foundUser)); 
    alert('Inicio de sesión exitoso.');
    this.router.navigate(['/profile']); 
  } else {
    alert('Error: Usuario no encontrado o contraseña incorrecta.');
  }


  if (foundUser) {
    localStorage.setItem('userProfile', JSON.stringify(foundUser)); // ✅ Guardar usuario logueado en localStorage
    alert('Inicio de sesión exitoso.');
    this.router.navigate(['/profile']); // ✅ Redirigir al perfil
  } else {
    alert('Error: Credenciales incorrectas.');
  }
}

  }


