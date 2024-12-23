import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  links: {route: string, label: string, isActive: boolean} [] = [
    {
      route: '/',
      label: 'home',
      isActive: false,
    },
    {
      route: '/projects',
      label: 'projects',
      isActive: false,
    },
    {
      route: '/taches',
      label: 'taches',
      isActive: false,
    },
    {
      route: '/group',
      label: 'group',
      isActive: false,
    }
  ]
}
