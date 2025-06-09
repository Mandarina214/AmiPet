import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { createAnimation } from '@ionic/core';
import { ActivatedRoute } from '@angular/router';
import { PetProfilePage } from './pages/pet-profile/pet-profile.page'; 


const customAnimation = (baseEl: HTMLElement) => {
  const animation = createAnimation()
    .addElement(baseEl)
    .duration(500)
    .fromTo('opacity', '0', '1')
    .fromTo('transform', 'translateX(100px)', 'translateX(0)');
  return animation;
};



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },


  {path: 'login',loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule) , data: { animation: customAnimation } },

  {path: 'register',loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)},

  { path: 'profile',loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)},

  {path: 'pet-profile',loadChildren: () => import('./pages/pet-profile/pet-profile.module').then( m => m.PetProfilePageModule) , data: { animation: customAnimation } },

  {path: 'pets-list',loadChildren: () => import('./pages/pets-list/pets-list.module').then( m => m.PetsListPageModule), data: { animation: customAnimation } },

  {path: 'profile/:id', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule), data: { animation: customAnimation } },

  {path: 'add-pet',loadChildren: () => import('./pages/add-pet/add-pet.module').then( m => m.AddPetPageModule) , data: { animation: customAnimation } },
  { path: 'pet-profile/:id', component: PetProfilePage },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
