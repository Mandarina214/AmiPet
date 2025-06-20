import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,

})
export class AppComponent {
  showMenu = false; 

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showMenu = this.router.url !== '/login'; 
    });
  }
}
