import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from '../profile/profile.page';



@Component({
  standalone:true,
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]

})

export class AddPetPage implements OnInit{
  showMenu = false;
  
  profile: any = {};
  pets: any[] = [];
  pet:any={}
  newPet: any = { name: '', type: '', age: '', weight: '', birthDate: '', sex: '', vaccines: [], history: '' };

constructor(private route: ActivatedRoute, private router: Router) { // ✅ Agregar Router
    this.router.events.subscribe(() => {
      this.showMenu = this.router.url !== '/login'; // ✅ Ocultar menú en login
    });
  }




   savePet() {
  let usersPets = JSON.parse(localStorage.getItem('usersPets') || '{}'); // ✅ Obtener mascotas guardadas
  const loggedUser = JSON.parse(localStorage.getItem('userProfile') || '{}'); // ✅ Obtener usuario actual

  if (!loggedUser.email) {
    alert('Error: No hay un usuario logueado.');
    return;
  }

  if (!usersPets[loggedUser.email]) {
    usersPets[loggedUser.email] = []; // ✅ Crear array de mascotas si no existe
  }

  // ✅ Asignar ID único a la mascota
  this.newPet.id = usersPets[loggedUser.email].length > 0 
    ? Math.max(...usersPets[loggedUser.email].map((p: { id: number }) => p.id)) + 1 
    : 1;

  usersPets[loggedUser.email].push({ ...this.newPet }); // ✅ Guardar mascota bajo el usuario
  localStorage.setItem('usersPets', JSON.stringify(usersPets)); // ✅ Guardar en `localStorage`

  alert('Mascota guardada correctamente.');
}


  user = {
    name: '',
    phone: '',
    address: ''
  };

  updateProfile() {
  if (!this.profile || Object.keys(this.profile).length === 0) {
    alert('Error: No hay datos de perfil para guardar.');
    return;
  }

  localStorage.setItem('userProfile', JSON.stringify(this.profile)); // ✅ Guarda los datos
  alert('Perfil actualizado correctamente.');
}

  ngOnInit() {
  const loggedUser = JSON.parse(localStorage.getItem('userProfile') || '{}'); // ✅ Obtener usuario actual

  if (!loggedUser.email) {
    alert('Error: No hay un usuario logueado.');
    this.router.navigate(['/login']);
    return;
  }

  let usersPets = JSON.parse(localStorage.getItem('usersPets') || '{}'); // ✅ Obtener mascotas por usuario
  this.pets = usersPets[loggedUser.email] || []; // ✅ Mostrar solo las mascotas del usuario actual
}

}

  
