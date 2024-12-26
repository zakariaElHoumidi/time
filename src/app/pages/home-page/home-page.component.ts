import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ProjectService} from '../../services/Project/project.service';
import {TacheService} from '../../services/Tache/tache.service';
import {ParametreService} from '../../services/Parametre/parametre.service';
import {Tache} from '../../interfaces/tache.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent{
  public readonly projectService = inject(ProjectService);
  public readonly parametreService = inject(ParametreService);
  public readonly tacheService = inject(TacheService);

  selectedProject: number = 0;
  selectedTask: number = 0;

  hasStarted: boolean = false;
  isStartButtonVisible: boolean = true;
  dateTimeEntree: string | null = null;
  dateTimeSortie: string | null = null;
  canExit: boolean = false;
  countdown: number = 10;
  countdownInterval: ReturnType<typeof setInterval> | null = null;

  projectSelected_label: string|null = null;
  tacheSelected_label: string|null = null;

  isButtonDisabled(): boolean {
    if (this.parametreService.isProjectAndTacheRequired()) {
      return Number(this.selectedProject) === 0 || Number(this.selectedTask) === 0;
    }
    if (this.parametreService.isProjectAndTacheNullable()) {
      return false;
    }
    if (this.parametreService.isProjectRequiredAndTacheNullable()) {
      return Number(this.selectedProject) === 0;
    }
    if (this.parametreService.isProjectNullableAndTacheRequired()) {
      return Number(this.selectedTask) === 0;
    }

    return false;
  }

  onProjectChange(): void {
    this.selectedTask = 0;
  }

  onTaskChange(): void {
  }

  onStart(): void {
    this.hasStarted = true;
    this.dateTimeEntree = new Date().toLocaleString();
    this.isStartButtonVisible = false;
    this.initializeCountdown();

    this.projectSelected_label = this.getProject(this.selectedProject);
    this.tacheSelected_label = this.getTache(this.selectedTask);
  }

  private initializeCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.canExit = true;
        if (this.countdownInterval) {
          clearInterval(this.countdownInterval);
        }
      }
    }, this.countdown * 100);
  }

  onSortie(): void {
    this.dateTimeSortie = new Date().toLocaleString();
  }

  getTaches(): Tache[] {
    if (this.selectedProject != 0) {
      return this.tacheService.listByProject(this.selectedProject);
    }
    return this.tacheService.taches();
  }

  getProject(id_project: string|number|null|undefined): string|null {
    if (!id_project) {
      return null;
    }

    const id_number = typeof id_project === 'string' ? parseInt(id_project) : id_project;

    return this.projectService.getProject(id_number);
  }

  getTache(id_tache: string|number|null|undefined): string|null {
    if (!id_tache) {
      return null;
    }

    const id_number = typeof id_tache === 'string' ? parseInt(id_tache) : id_tache;

    return this.tacheService.getTache(id_number);
  }
}
