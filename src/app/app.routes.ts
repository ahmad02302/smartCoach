import { Routes } from '@angular/router';
import { routes as tabsRoutes } from './components/tabs/tabs.routes';


export const routes: Routes = [
  ...tabsRoutes,
  {
    path: 'edit-profile',
    loadComponent: () =>
      import('./pages/edit-profile/edit-profile.page')
        .then(m => m.EditProfilePage)
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  }
];
