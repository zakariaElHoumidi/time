import { Component } from '@angular/core';
import {Mode} from '../../../enum/mode.enum';
import {TacheListComponent} from '../tache-list/tache-list.component';
import {TacheCreateComponent} from '../tache-create/tache-create.component';
import {TacheAlertComponent} from '../tache-alert/tache-alert.component';
import {Tache} from '../../../interfaces/tache.interface';

@Component({
  selector: 'app-tache-shell',
  standalone: true,
  imports: [
    TacheListComponent,
    TacheCreateComponent,
    TacheAlertComponent
  ],
  templateUrl: './tache-shell.component.html',
  styleUrl: './tache-shell.component.css'
})
export class TacheShellComponent {
  protected readonly Mode = Mode;

  mode: Mode = Mode.LIST;
  tache: Tache|null = null;

  message: string = '';
  title: string = '';
  action: string = '';
  confirmText: string = ''

  modeChange(event: { mode: Mode, tache: Tache|null, action: string }): void {
    this.mode = event.mode;
    this.tache = event.tache || null;
    this.action = event.action;

    if (event.action === 'delete'){
      this.confirmText = 'Delete'
      this.title = 'Delete';
      this.message = 'Are you sure you want to delete this tache ?'
    } else if (event.action === 'toggle'){
      this.confirmText = 'Toggle'
      this.title = 'Toggle';
      this.message = 'Are you sure you want to toggle the status of this tache ?'
    } else if(event.action === 'associated'){
      this.confirmText = 'disable'
      this.title = 'Disable';
      this.message = 'this tache is associated you want to disable ?'
    } else if(event.action === 'delete-all') {
      this.confirmText = 'delete All'
      this.title = 'Delete All';
      this.message = 'Are you sure you want to delete all taches ?'
    }
  }
}
