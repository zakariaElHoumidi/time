import {Component, EventEmitter, inject, Output} from '@angular/core';
import {Tache} from '../../../interfaces/tache.interface';
import {Mode} from '../../../enum/mode.enum';
import {TacheService} from '../../../services/Tache/tache.service';
import {ObjectKeyPipe} from '../../../pipes/object-key.pipe';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../../../services/Project/project.service';

@Component({
  selector: 'app-tache-list',
  standalone: true,
  imports: [
    ObjectKeyPipe,
    FormsModule
  ],
  templateUrl: './tache-list.component.html',
  styleUrl: './tache-list.component.css'
})
export class TacheListComponent {
  public readonly tacheService = inject(TacheService);
  public readonly projectService = inject(ProjectService);
  @Output() changeMode: EventEmitter< { mode: Mode, tache: Tache | null, action: string } > = new EventEmitter< { mode: Mode, tache: Tache | null, action: string } >();

  filtersByLabel: string = '';
  filtersByStatus: string = '';
  filtersApply: { [key: string]: any }[] = [];
  selectAll: boolean = false;
  tachesSelectedToDelete: number[] = [];


  // Crud
  deleteAll(): void {
    const mode = {
      mode: Mode.CONFIRMATION,
      tache: null,
      action: 'delete-all'
    };
    this.changeMode.emit(mode);
  }

  creationTache(tache: Tache|null): void{
    const mode = {
      mode: Mode.CREATION,
      tache: tache,
      action: ''
    };

    this.changeMode.emit(mode);
  }

  deleteTache(tache: Tache): void{
    const mode = {
      mode: Mode.CONFIRMATION,
      tache: tache,
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
    this.tacheService.filterData(this.filtersApply);
  }

  resetFilter(): void {
    this.filtersByLabel = '';
    this.filtersByStatus = '';
    this.filtersApply = [];

    this.tacheService.resetFilter();
  }
  toggleSelectAll(): void {
    const allTaches = this.tacheService.taches();
    allTaches.forEach((tache: Tache) => tache.selected = this.selectAll);

    this.tachesSelectedToDelete = this.selectAll ? allTaches.map(tache => tache.id) : [];
  }

  toggleStatus(tache: Tache){
    const mode = {
      mode: Mode.CONFIRMATION,
      tache: tache,
      action: 'toggle'
    };

    this.changeMode.emit(mode);
  }
}
