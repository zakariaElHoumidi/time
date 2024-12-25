import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Groupe} from '../../../interfaces/groupe.interface';
import {FormsModule} from '@angular/forms';
import {Mode} from '../../../enum/mode.enum';
import {GroupeService} from '../../../services/Groupe/groupe.service';

@Component({
  selector: 'app-groupe-create',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './groupe-create.component.html',
  styleUrl: './groupe-create.component.css'
})
export class GroupeCreateComponent implements OnInit{
  public readonly groupService = inject(GroupeService);

  @Output() changeMode: EventEmitter< { mode: Mode, group: Groupe | null, action: string } > = new EventEmitter< { mode: Mode, group: Groupe | null, action: string } >();
  @Input() group!: Groupe|null;

  ngOnInit() {
    if (this.group){
      this.newGroupe = {...this.group}
    }
  }

  newGroupe: Groupe = {
    id: this.generateUniqueID(),
    label: '',
    status: 1,
    selected: false
  };

  generateUniqueID(): number {
    const randomPart = Math.floor(Math.random() * 1000000);
    const timestampPart = Date.now();
    return timestampPart + randomPart;
  }

  resetMode(): void {
    this.group = null;
    
    const mode = {
      mode: Mode.LIST,
      group: null,
      action: ''
    };

    this.changeMode.emit(mode);
  }

  addOrUpdateGroup(): void {
    if (this.group){
      this.groupService.updateGroup(this.newGroupe)
    } else {
      this.groupService.addToList(this.newGroupe)
    }

    this.resetMode();
  }

  deleteGroup(group: Groupe){
    const mode = {
      mode: Mode.DELETE,
      group: group,
      action: 'delete'
    };

    this.changeMode.emit(mode);
  }

  toggleStatus(group: Groupe){
    const mode = {
      mode: Mode.CONFIRMATION,
      group: group,
      action: 'toggle'
    };

    this.changeMode.emit(mode);
  }
}
