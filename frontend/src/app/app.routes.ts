import { Routes } from '@angular/router';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    // canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'apps/:id',
    loadComponent: () =>
      import('./channel-list/channel-list.component').then(
        (m) => m.ChannelListComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
  },
];
