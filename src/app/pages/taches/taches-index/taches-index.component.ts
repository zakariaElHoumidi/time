import {Component, inject} from '@angular/core';
import {Mode} from '../../../enum/mode.enum';
import {TacheService} from '../../../services/Tache/tache.service';
import {Tache} from '../../../interfaces/tache.interface';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../../../services/Project/project.service';
import {Project} from '../../../interfaces/project.interface';
import {Groupe} from '../../../interfaces/groupe.interface';
import {ObjectKeyPipe} from '../../../pipes/object-key.pipe';

@Component({
  selector: 'app-taches-index',
  standalone: true,
  imports: [
    FormsModule,
    ObjectKeyPipe
  ],
  templateUrl: './taches-index.component.html',
  styleUrl: './taches-index.component.css'
})
export class TachesIndexComponent {
  protected readonly Mode = Mode;
  public readonly tacheService = inject(TacheService);
  public readonly projectService = inject(ProjectService);

  mode: Mode = Mode.LIST;
  tache: Tache = {
    id: this.generateUniqueID(),
    label: '',
    project_id: null,
    status: 1,
    selected: false
  }
  tachesSelectedToDelete: number[] = [];
  filtersByLabel: string = '';
  filtersByStatus: string = '';
  filtersApply: { [key: string]: any }[] = [];
  projectListActive: Project[] = this.projectService.projects().filter((project: Project) => project.status === 1);
  deleteTacheId: number|null = null;
  selectAll: boolean = false;

  generateUniqueID(): number {
    const randomPart = Math.floor(Math.random() * 1000000);
    const timestampPart = Date.now();
    return timestampPart + randomPart;
  }

  addMode(): void {
    this.mode = Mode.ADD;
  }

  editMode(tache: Tache): void {
    this.tache = tache;
    this.mode = Mode.EDIT;
  }

  resetMode(): void {
    this.mode = Mode.LIST;
    this.tache = {
      id: this.generateUniqueID(),
      label: '',
      project_id: null,
      status: 1,
      selected: false
    }
    this.tachesSelectedToDelete = [];
    this.selectAll = false;
  }

  // Crud

  toggleSelectAll() {
    const allTaches = this.tacheService.taches();
    allTaches.forEach((tache: Tache) => tache.selected = this.selectAll);

    this.tachesSelectedToDelete = this.selectAll ? allTaches.map(tache => tache.id) : [];
  }

  toggleStatus(id_tache: number, status_tache: number): void {
      let message = status_tache == 1 ? 'desactive' : 'active';
      let confirmation = confirm(`Are You sure you want ${message} this Tache ?`)

      if (confirmation) {
        this.tacheService.toggleStatus(id_tache);
      }
  }

  addTache(): void {
    this.tacheService.addToList(this.tache);
    this.resetMode()
  }

  editTache(): void {
    this.tacheService.updateTache(this.tache);
    this.resetMode()
  }

  deleteTache(id_tache: number): void{
    this.deleteTacheId = id_tache;
    this.mode = Mode.DELETE;
  }

  confirmDelete($bool: boolean = false): void {
    if ($bool && this.deleteTacheId) {
      this.tacheService.deleteTache(this.deleteTacheId)
      this.resetMode()
    }
  }

  deleteAll(): void{
    this.mode = Mode.DELETE_ALL;
  }

  confirmDeleteAll($bool: boolean = false): void {
    if ($bool) {
      let id_taches: number[] = [];

      id_taches = this.tacheService.taches()
        .filter((tache: Tache) => tache.selected)
        .map((group: Groupe) => group.id );

      if (id_taches.length === 0) {
        return;
      }

      this.tacheService.deleteTaches(id_taches);
      this.resetSelectedTaches();
      this.resetMode()
    }
  }

  getProject(id_project: string|number|null|undefined): string|null {
    if (!id_project) {
      return null;
    }

    const id_number = typeof id_project === 'string' ? parseInt(id_project) : id_project;

    return this.projectService.getProject(id_number);
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
    this.tacheService.filterData(this.filtersApply);
  }

  resetFilter(): void {
    this.filtersByLabel = '';
    this.filtersByStatus = '';
    this.filtersApply = [];

    this.tacheService.resetFilter();
    this.resetMode();
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ifAssosier(tacheID: number): boolean {
    let indexTache = this.tacheService.taches().findIndex((tache: Tache) => {
      return tache.id === tacheID
    });

    if (indexTache !== -1) {
      let tache = this.tacheService.taches()[indexTache];
      return !tache.project_id;
    }

    return false
  }


  resetSelectedTaches(): void {
    this.tacheService.taches().forEach((tache: Tache) => {
      tache.selected = false;
    })

    this.tacheService.updateLocalStorage()
  }
}
