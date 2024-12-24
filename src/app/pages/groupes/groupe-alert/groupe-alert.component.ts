import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Groupe} from '../../../interfaces/groupe.interface';
import {Mode} from '../../../enum/mode.enum';
import {GroupeService} from '../../../services/Groupe/groupe.service';
import {ProjectService} from '../../../services/Project/project.service';

@Component({
  selector: 'app-groupe-alert',
  standalone: true,
  imports: [],
  templateUrl: './groupe-alert.component.html',
  styleUrl: './groupe-alert.component.css'
})
export class GroupeAlertComponent {
  public readonly groupService = inject(GroupeService);
  public readonly projectService = inject(ProjectService);
  @Output() changeMode: EventEmitter< { mode: Mode, group: Groupe | null, action: string } > = new EventEmitter< { mode: Mode, group: Groupe | null, action: string } >();

  @Input() title: string = 'Confirmation';
  @Input() message: string = 'Are you sure you want to continue ?';
  @Input() confirmText: string = 'Yes';
  @Input() cancelText: string = 'No';
  @Input() actionType: string = 'toggle';
  @Input() group: Groupe|null = null;

  resetMode(): void {
    this.message = '';
    const mode = {
      mode: Mode.LIST,
      group: null,
      action: ''
    };

    this.changeMode.emit(mode);
    this.groupService.removeSelected()
  }

  onConfirm(): void{
    switch (this.actionType) {
      case 'delete':
        this.confirmDelete();
        break;
      case 'toggle':
        this.toggleStatusConfirmation();
        break;
      case 'associated':
        if (this.group?.status === 1){
          this.toggleStatusConfirmation()
        }
        break;
      case 'delete-all':
        this.confirmDeleteAll();
    }
  }

  confirmDelete(): void {
    if (this.group) {
      if (this.projectService.ifAssocierWithProject(this.group.id)) {
        const mode = {
          mode: Mode.CONFIRMATION,
          group: this.group,
          action: 'associated'
        };
        this.changeMode.emit(mode);
        return;
      }

      this.groupService.deleteGroup(this.group.id)
      this.resetMode()
    }
  }

  toggleStatusConfirmation(): void {
    if (this.group) {
      this.groupService.toggleStatus(this.group.id);

      this.resetMode()
    }
  }

  confirmDeleteAll(): void {
    let id_groups: number[] = [];

    const groups = this.groupService.groups()
      .filter((groupe: Groupe) => !this.projectService.ifAssocierWithProject(groupe.id))

    if (groups.length === 0) {
      this.resetMode();
      return;
    }

    id_groups = groups
      .filter((groupe: Groupe) => groupe.selected)
      .map((group: Groupe) => group.id );

    this.groupService.deleteGroups(id_groups);
    this.resetMode()
  }
}
