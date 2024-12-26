import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HomeTableComponent} from '../home-table/home-table.component';
import {HomeSelectComponent} from '../home-select/home-select.component';

@Component({
  selector: 'app-home-shell',
  standalone: true,
  imports: [
    FormsModule,
    HomeTableComponent,
    HomeSelectComponent
  ],
  templateUrl: './home-shell.component.html',
  styleUrl: './home-shell.component.css'
})
export class HomeShellComponent {

}
