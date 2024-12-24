import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ObjectKeyPipe} from '../../../pipes/object-key.pipe';
import {GroupeService} from '../../../services/Groupe/groupe.service';
import {Groupe} from '../../../interfaces/groupe.interface';
import {Mode} from '../../../enum/mode.enum';

@Component({
  selector: 'app-groupe-list',
  standalone: true,
  imports: [
    FormsModule,
    ObjectKeyPipe
  ],
  templateUrl: './groupe-list.component.html',
  styleUrl: './groupe-list.component.css'
})
export class GroupeListComponent {
  public readonly groupService = inject(GroupeService);
  @Output() changeMode: EventEmitter< { mode: Mode, group: Groupe | null, action: string } > = new EventEmitter< { mode: Mode, group: Groupe | null, action: string } >();

  filtersByLabel: string = '';
  filtersByStatus: string = '';
  filtersApply: { [key: string]: any }[] = [];
  selectAll: boolean = false;
  groupsSelectedToDelete: number[] = [];

  // Crud
  deleteAll(): void {
    const mode = {
      mode: Mode.CONFIRMATION,
      group: null,
      action: 'delete-all'
    };
    this.changeMode.emit(mode);
  }

  creationGroupe(groupe: Groupe|null): void{
    const mode = {
      mode: Mode.CREATION,
      group: groupe,
      action: ''
    };

    this.changeMode.emit(mode);
  }

  deleteGroup(group: Groupe): void{
    const mode = {
      mode: Mode.CONFIRMATION,
      group: group,
      action: 'delete'
    };
    this.changeMode.emit(mode);
  }

  applyFilter(): void {
    const filters = [];

    if (this.filtersByLabel) {
      filters.push({ label: this.filtersByLabel });
    }

    if (this.filtersByStatus) {
      filters.push({ status: this.filtersByStatus });
    }

    this.filtersApply = filters;
    this.groupService.filterData(this.filtersApply);
  }

  resetFilter(): void {
    this.filtersByLabel = '';
    this.filtersByStatus = '';
    this.filtersApply = [];

    this.groupService.resetFilter();
  }
  toggleSelectAll(): void {
    const allGroups = this.groupService.groups();
    allGroups.forEach((group: Groupe) => group.selected = this.selectAll);

    this.groupsSelectedToDelete = this.selectAll ? allGroups.map(group => group.id) : [];
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
