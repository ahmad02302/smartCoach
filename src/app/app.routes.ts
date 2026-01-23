import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [loginGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
    canActivate: [loginGuard]
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
    canActivate: [authGuard]
  },
  {
    path: 'exercises/:id',
    loadComponent: () => import('./pages/exercises/exercises.page').then(m => m.ExercisesPage),
    canActivate: [authGuard]
  },
  {
    path: 'exercise/:id',
    loadComponent: () => import('./pages/exercise-details/exercise-details.page').then(m => m.ExerciseDetailPage),
    canActivate: [authGuard]
  },
  {
    path: 'edit-profile',
    loadComponent: () =>
      import('./pages/edit-profile/edit-profile.page')
        .then(m => m.EditProfilePage),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
