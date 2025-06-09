import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  standalone:true,
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.page.html',
  styleUrls: ['./pet-profile.page.scss'],
imports: [IonicModule, CommonModule, FormsModule]


})
export class PetProfilePage implements OnInit {
  showMenu = true; //
  pet = { type: '', name: '', birthDate: '', weight: '', age: '', breed: '', vaccines: [], history: '' };

constructor(private route: ActivatedRoute) {}

clearForm() {
  this.pet = { type: '', name: '', birthDate: '', weight: '', age: '', breed: '', vaccines: [], history: '' };
}



  ngOnInit() {
    
 const petId = Number(this.route.snapshot.paramMap.get('id')); 
 

  let usersPets = JSON.parse(localStorage.getItem('usersPets') || '{}'); 
  const loggedUser = JSON.parse(localStorage.getItem('userProfile') || '{}'); 

  if (loggedUser.email && petId) {
    
    this.pet = usersPets[loggedUser.email]?.find((p: { id: number }) => p.id === petId) || {};

  } else {
    alert('Error: Mascota no encontrada.');
  }


  }

  updatePetProfile() {
  let pets = JSON.parse(localStorage.getItem('pets') || '[]');
  pets.push({ ...this.pet });
  localStorage.setItem('pets', JSON.stringify(pets));

  alert('Perfil guardado correctamente');
  this.clearForm(); // Limpia el formulario después de guardar
}
}
