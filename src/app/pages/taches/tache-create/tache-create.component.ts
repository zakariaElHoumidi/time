import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TacheService} from '../../../services/Tache/tache.service';
import {ProjectService} from '../../../services/Project/project.service';
import {Tache} from '../../../interfaces/tache.interface';
import {Mode} from '../../../enum/mode.enum';
import {Project} from '../../../interfaces/project.interface';

@Component({
  selector: 'app-tache-create',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './tache-create.component.html',
  styleUrl: './tache-create.component.css'
})
export class TacheCreateComponent implements OnInit {
  public readonly tacheService = inject(TacheService);
  public readonly projectService = inject(ProjectService);

  @Output() changeMode: EventEmitter< { mode: Mode, tache: Tache | null, action: string } > = new EventEmitter< { mode: Mode, tache: Tache | null, action: string } >();
  @Input() tache!: Tache|null;

  projectListActive: Project[] = this.projectService.projects().filter((project: Project) => project.status === 1);
  newTache: Tache = {
    id: this.generateUniqueID(),
    label: '',
    status: 1,
    selected: false
  };

  ngOnInit() {
    if (this.tache){
      this.newTache = {...this.tache}
    }
  }

  generateUniqueID(): number {
    const randomPart = Math.floor(Math.random() * 1000000);
    const timestampPart = Date.now();
    return timestampPart + randomPart;
  }

  resetMode(): void {
    this.tache = null;

    const mode = {
      mode: Mode.LIST,
      tache: null,
      action: ''
    };

    this.changeMode.emit(mode);
  }

  addOrUpdateTache(): void {
    if (this.tache){
      this.tacheService.updateTache(this.newTache)
    } else {
      this.tacheService.addToList(this.newTache)
    }

    this.resetMode();
  }

  deleteTache(tache: Tache){
    const mode = {
      mode: Mode.DELETE,
      tache: tache,
      action: 'delete'
    };

    this.changeMode.emit(mode);
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
