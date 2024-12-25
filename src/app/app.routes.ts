import { Routes } from '@angular/router';
import {GuestLayoutComponent} from './layouts/guest-layout/guest-layout.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {NotFoundRouteComponent} from './components/exception/not-found-route/not-found-route.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {GroupeShellComponent} from './pages/groupes/groupe-shell/groupe-shell.component';
import {ProjectShellComponent} from './pages/projects/project-shell/project-shell.component';
import {TacheShellComponent} from './pages/taches/tache-shell/tache-shell.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'projects',
        component: ProjectShellComponent
      },
      {
        path: 'taches',
        component: TacheShellComponent
      },
      {
        path: 'group',
        component: GroupeShellComponent
      },
    ]
  },

  {
    path: '**',
    component: NotFoundRouteComponent
  }
];
