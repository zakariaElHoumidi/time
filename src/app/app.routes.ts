import { Routes } from '@angular/router';
import {GuestLayoutComponent} from './layouts/guest-layout/guest-layout.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {NotFoundRouteComponent} from './components/exception/not-found-route/not-found-route.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {ProjectsIndexComponent} from './pages/projects/projects-index/projects-index.component';
import {TachesIndexComponent} from './pages/taches/taches-index/taches-index.component';
import {GroupeIndexComponent} from './pages/groupes/groupe-index/groupe-index.component';

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
        component: ProjectsIndexComponent
      },
      {
        path: 'taches',
        component: TachesIndexComponent
      },
      {
        path: 'group',
        component: GroupeIndexComponent
      },
    ]
  },

  {
    path: '**',
    component: NotFoundRouteComponent
  }
];
