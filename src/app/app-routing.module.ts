import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  {
    path: 'private',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    ,canActivate:[AuthguardService]
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'edit-note',
    loadChildren: () => import('./pages/edit-note/edit-note.module').then( m => m.EditNotePageModule)
  },
  {
    path: 'idioma',
    loadChildren: () => import('./pages/idioma/idioma.module').then( m => m.IdiomaPageModule)
  },
  {
    path: 'idioma',
    loadChildren: () => import('./pages/idioma/idioma.module').then( m => m.IdiomaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
