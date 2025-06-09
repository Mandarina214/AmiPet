import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RouterModule,} from '@angular/router';
import { createAnimation } from '@ionic/core';


@Component({
  standalone:true,
  selector: 'app-pets-list',
  templateUrl: './pets-list.page.html',
  styleUrls: ['./pets-list.page.scss'],
  imports: [CommonModule, IonicModule,RouterModule] 
})
export class PetsListPage implements OnInit {
  showMenu = false;
  pets: any[] = [];

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

  let usersPets = JSON.parse(localStorage.getItem('usersPets') || '{}'); 
  this.pets = usersPets[loggedUser.email] || []; 
  console.log('Mascotas en `pet-list`:', this.pets); 


  setTimeout(() => {
    this.animateCards();
  }, 150);
}

animateCards() {
  const cards = document.querySelectorAll('ion-card');
  cards.forEach((card, index) => {
    createAnimation()
      .addElement(card)
      .duration(500)
      .delay(index * 100)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(30px)', 'translateY(0)')
      .play();
  });
}
  editPet(petId: number) {
    this.router.navigate(['/pet-profile', petId]); 
  }

  deletePet(petId: number) {
    this.pets = this.pets.filter(p => p.id !== petId);
    localStorage.setItem('pets', JSON.stringify(this.pets));
    alert('Mascota eliminada correctamente.');
  }
}
