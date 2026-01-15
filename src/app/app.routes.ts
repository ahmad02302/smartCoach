import { Routes } from '@angular/router';

export const routes: Routes = [
  {
        path: '',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
      },
  {
    path: 'exercises/:id',
    loadComponent: () => import('./pages/exercises/exercises.page').then(m => m.ExercisesPage)
  },

  {
    path: 'exercise/:id',
    loadComponent: () => import('./pages/exercise-details/exercise-details.page').then(m => m.ExerciseDetailPage)
  },
  {
    path: 'edit-profile',
    loadComponent: () =>
      import('./pages/edit-profile/edit-profile.page')
        .then(m => m.EditProfilePage)
  },

  {
    path: '**',
    redirectTo: ''
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  }
];
