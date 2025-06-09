import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ProfilePage implements OnInit {
  showMenu = false; 
  profile: any = {};
  pets: any[] = [];
  pet: any = {};
  newPet: any = { name: '', type: '', age: '', weight: '', birthDate: '', sex: '', vaccines: [], history: '' };

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.router.events.subscribe(() => {
      this.showMenu = this.router.url !== '/login'; 
    });
  }

  ngOnInit() {
  const loggedUserStr = localStorage.getItem('userProfile');

  if (!loggedUserStr || loggedUserStr === '{}') { 
    alert('Error: No hay un usuario logueado.');
    this.router.navigate(['/login']);
    return;
  }

  const loggedUser = JSON.parse(loggedUserStr); 

  if (!loggedUser.email) { 
    alert('Error: Datos de perfil no encontrados.');
    return;
  }

  this.profile = { ...loggedUser }; 


  let usersPets = JSON.parse(localStorage.getItem('usersPets') || '{}'); 
  this.pets = usersPets[loggedUser.email] || [];

  console.log('Mascotas del usuario:', this.pets); 

  if (this.pets.length === 0) {
    alert('No tienes mascotas guardadas.');
  }
}


  animateButton(event: MouseEvent) {
    const button = event.target as HTMLElement;
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 200);
  }

  savePet() {
    let pets = JSON.parse(localStorage.getItem('pets') || '[]');

    if (!this.newPet.id) {
      this.newPet.id = pets.length > 0 ? Math.max(...pets.map((p: { id: number }) => p.id)) + 1 : 1;
    }

    pets.push({ ...this.newPet });
    localStorage.setItem('pets', JSON.stringify(pets));

    alert('Mascota guardada correctamente.');
    this.newPet = { name: '', type: '', age: '', weight: '', birthDate: '', sex: '', vaccines: [], history: '' }; 
  }

  
    
  updateProfile() {

    const loggedUser = JSON.parse(localStorage.getItem('userProfile') || '{}'); 

  if (!this.profile || Object.keys(this.profile).length === 0) {
    alert('Error: No hay datos de perfil para guardar.');
    return;
  }

  
  if (!loggedUser.email) {
    alert('Error: No hay usuario logueado.');
    return;
  }

  let usersDB = JSON.parse(localStorage.getItem('usersDB') || '[]'); 
  const userIndex = usersDB.findIndex((u: any) => u.email === loggedUser.email); 

  if (userIndex !== -1) {
    usersDB[userIndex] = { ...loggedUser, ...this.profile }; 
    localStorage.setItem('usersDB', JSON.stringify(usersDB)); 
    localStorage.setItem('userProfile', JSON.stringify(usersDB[userIndex])); 
    alert('Perfil actualizado correctamente.');
  } else {
    alert('Error: Usuario no encontrado.');
  }
}

  }


