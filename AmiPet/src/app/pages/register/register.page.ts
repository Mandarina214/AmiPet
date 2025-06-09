import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone:true,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage {
 user = { name: '', email: '', password: '' };

  constructor(private router: Router) {}

  registerUser() {
  let usersDB = JSON.parse(localStorage.getItem('usersDB') || '[]'); 


  const userExists = usersDB.some((u: any) => u.email === this.user.email);
  if (userExists) {
    alert('Error: Este email ya está registrado.');
    return;
  }

  usersDB.push(this.user); 
  localStorage.setItem('usersDB', JSON.stringify(usersDB)); 
  localStorage.setItem('userProfile', JSON.stringify(this.user)); 
  alert('Registro exitoso.');
  this.router.navigate(['/profile']); 
}

  }


