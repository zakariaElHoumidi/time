import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ObjectKeyPipe} from "../../../pipes/object-key.pipe";
import {GroupeListComponent} from '../groupe-list/groupe-list.component';
import {Mode} from '../../../enum/mode.enum';
import {GroupeCreateComponent} from '../groupe-create/groupe-create.component';
import {Groupe} from '../../../interfaces/groupe.interface';
import {GroupeAlertComponent} from '../groupe-alert/groupe-alert.component';

@Component({
  selector: 'app-groupe-shell',
  standalone: true,
  imports: [
    FormsModule,
    ObjectKeyPipe,
    GroupeListComponent,
    GroupeCreateComponent,
    GroupeAlertComponent
  ],
  templateUrl: './groupe-shell.component.html',
  styleUrl: './groupe-shell.component.css'
})
export class GroupeShellComponent {
  protected readonly Mode = Mode;

  mode: Mode = Mode.LIST;
  group: Groupe|null = null;

  //
  message: string = '';
  title: string = '';
  action: string = '';
  confirmText: string = ''

  modeChange(event: { mode: Mode, group: Groupe|null, action: string }): void {
    this.mode = event.mode;
    this.group = event.group || null;
    this.action = event.action;

    if (event.action === 'delete'){
      this.confirmText = 'Delete'
      this.title = 'Delete';
      this.message = 'Are you sure you want to delete this group ?'
    } else if (event.action === 'toggle'){
      this.confirmText = 'Toggle'
      this.title = 'Toggle';
      this.message = 'Are you sure you want to toggle the status of this group ?'
    } else if(event.action === 'associated'){
      this.confirmText = 'disable'
      this.title = 'Disable';
      this.message = 'this group is associated you want to disable ?'
    } else if(event.action === 'delete-all') {
      this.confirmText = 'delete All'
      this.title = 'Delete All';
      this.message = 'Are you sure you want to delete all groups ?'
    }
  }
}
