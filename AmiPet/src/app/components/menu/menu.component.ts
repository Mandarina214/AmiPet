import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonicModule, RouterModule]
  
})

  export class MenuComponent {
  showMenu = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showMenu = this.router.url !== '/login'; 
    });
  }
}
