import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPetPage } from './add-pet.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  { path: '', component: AddPetPage } 
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule,IonicModule],
  exports: [RouterModule],
})
export class AddPetPageRoutingModule {}

