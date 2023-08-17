import { Routes } from '@angular/router';
import { ChannelListComponent } from './channel-list/channel-list.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'channels', // New route for ChannelListPage
    component: ChannelListComponent,
  },
  {
    path: 'apps/:id',
    loadComponent: () =>
      import('./channel-list/channel-list.component').then(
        (m) => m.ChannelListComponent
      ),
  },
];
