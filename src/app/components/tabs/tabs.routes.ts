import { Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../../pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'exercises/:id',
        loadComponent: () => import('../../pages/exercises/exercises.page').then(m => m.ExercisesPage)
      },
      {
        path: 'exercise/:id',
        loadComponent: () => import('../../pages/exercise-details/exercise-details.page').then(m => m.ExerciseDetailPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('../../pages/profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
