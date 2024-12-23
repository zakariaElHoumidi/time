import {Component, inject} from '@angular/core';
import {Mode} from '../../../enum/mode.enum';
import {Groupe} from '../../../interfaces/groupe.interface';
import {GroupeService} from '../../../services/Groupe/groupe.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectService} from '../../../services/Project/project.service';
import {ObjectKeyPipe} from '../../../pipes/object-key.pipe';

@Component({
  selector: 'app-groupe-index',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ObjectKeyPipe
  ],
  templateUrl: './groupe-index.component.html',
  styleUrl: './groupe-index.component.css'
})
export class GroupeIndexComponent{
  protected readonly Mode = Mode;
  public readonly groupService = inject(GroupeService);
  public readonly projectService = inject(ProjectService);

  mode: Mode = Mode.LIST;
  group: Groupe = {
    id: this.generateUniqueID(),
    label: '',
    status: 1,
    selected: false
  };
  groupsSelectedToDelete: number[] = [];
  filtersByLabel: string = '';
  filtersByStatus: string = '';
  filtersApply: { [key: string]: any }[] = [];
  deleteGroupId: number|null = null;
  selectAll: boolean = false;

  generateUniqueID(): number {
    const randomPart = Math.floor(Math.random() * 1000000);
    const timestampPart = Date.now();
    return timestampPart + randomPart;
  }

  addMode(): void {
    this.mode = Mode.ADD;
  }

  editMode(group: Groupe): void {
    this.group = group;
    this.mode = Mode.EDIT;
  }

  resetMode(): void {
    this.mode = Mode.LIST;
    this.group = {
      id: this.generateUniqueID(),
      label: '',
      status: 1,
      selected: false
    }
    this.groupsSelectedToDelete = [];
    this.selectAll = false;
  }

  // Crud
  toggleSelectAll() {
    const allGroups = this.groupService.groups();
    allGroups.forEach((group: Groupe) => group.selected = this.selectAll);

    this.groupsSelectedToDelete = this.selectAll ? allGroups.map(group => group.id) : [];
  }

  toggleStatus(id_group: number, status_group: number): void {
    let message = status_group == 1 ? 'desactive' : 'active';
    let confirmation = confirm(`Are You sure you want ${message} this group ?`)

    if (confirmation) {
      this.groupService.toggleStatus(id_group);
    }
  }

  addGroup(): void {
    this.groupService.addToList(this.group);
    this.resetMode()
  }

  editGroup(): void {
    this.groupService.updateGroup(this.group);
    this.resetMode()
  }

  deleteGroup(id_group: number): void{
    this.deleteGroupId = id_group;
    this.mode = Mode.DELETE;
  }

  confirmDelete($bool: boolean = false): void {
    if ($bool && this.deleteGroupId) {
      if (this.projectService.ifAssocierWithProject(this.deleteGroupId)) {
        this.mode = Mode.ALERT;
        return;
      }

      this.groupService.deleteGroup(this.deleteGroupId)
      this.resetMode()
    }
  }

  deleteAll(): void{
    this.mode = Mode.DELETE_ALL;
  }

  confirmDeleteAll($bool: boolean = false): void {
    if ($bool) {
      let id_groups: number[] = [];

      const groups = this.groupService.groups()
        .filter((groupe: Groupe) => !this.projectService.ifAssocierWithProject(groupe.id))

      if (groups.length === 0) {
        this.mode = Mode.ALERT;
        this.resetSelectedGroups();
        return;
      }

      id_groups = groups.filter((groupe: Groupe) => groupe.selected).map((group: Groupe) => group.id );

      this.groupService.deleteGroups(id_groups);
      this.resetSelectedGroups();
      this.resetMode()
    }
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
    this.resetMode();
  }

  resetSelectedGroups(): void {
    this.groupService.groups().forEach((groupe: Groupe) => {
      groupe.selected = false;
    })

    this.groupService.updateLocalStorage()
  }
}
