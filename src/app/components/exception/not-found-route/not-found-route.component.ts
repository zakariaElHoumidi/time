import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-not-found-route',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './not-found-route.component.html',
  styleUrl: './not-found-route.component.css'
})
export class NotFoundRouteComponent {
  alt = "Not Found Image 2";
  imageSrc = "https://i.pinimg.com/736x/05/1b/7d/051b7d93394fc94c082f1801bc4ccfb2.jpg";
}
