import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {TacheService} from '../../../services/Tache/tache.service';
import {ProjectService} from '../../../services/Project/project.service';
import {Mode} from '../../../enum/mode.enum';
import {Tache} from '../../../interfaces/tache.interface';

@Component({
  selector: 'app-tache-alert',
  standalone: true,
  imports: [],
  templateUrl: './tache-alert.component.html',
  styleUrl: './tache-alert.component.css'
})
export class TacheAlertComponent {
  public readonly tacheService = inject(TacheService);
  public readonly projectService = inject(ProjectService);
  @Output() changeMode: EventEmitter< { mode: Mode, tache: Tache | null, action: string } > = new EventEmitter< { mode: Mode, tache: Tache | null, action: string } >();

  @Input() title: string = 'Confirmation';
  @Input() message: string = 'Are you sure you want to continue ?';
  @Input() confirmText: string = 'Yes';
  @Input() cancelText: string = 'No';
  @Input() actionType: string = 'toggle';
  @Input() tache: Tache|null = null;

  resetMode(): void {
    this.message = '';
    const mode = {
      mode: Mode.LIST,
      tache: null,
      action: ''
    };

    this.changeMode.emit(mode);
    this.tacheService.removeSelected()
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
        if (this.tache?.status === 1){
          this.toggleStatusConfirmation()
        }
        break;
      case 'delete-all':
        this.confirmDeleteAll();
    }
  }

  confirmDelete(): void {
    if (this.tache) {
      this.tacheService.deleteTache(this.tache.id)
      this.resetMode()
    }
  }

  toggleStatusConfirmation(): void {
    if (this.tache) {
      this.tacheService.toggleStatus(this.tache.id);

      this.resetMode()
    }
  }

  confirmDeleteAll(): void {
    let id_taches: number[] = [];

    id_taches = this.tacheService.taches()
      .filter((tache: Tache) => tache.selected)
      .map((tache: Tache) => tache.id );

    if (id_taches.length === 0) {
      this.resetMode();
      return;
    }

    this.tacheService.deleteTaches(id_taches);
    this.resetMode()
  }
}
