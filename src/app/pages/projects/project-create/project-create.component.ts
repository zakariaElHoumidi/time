import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {GroupeService} from '../../../services/Groupe/groupe.service';
import {Project} from '../../../interfaces/project.interface';
import {Mode} from '../../../enum/mode.enum';
import {Groupe} from '../../../interfaces/groupe.interface';
import {ProjectService} from '../../../services/Project/project.service';

@Component({
  selector: 'app-project-create',
  standalone: true,
    imports: [
      FormsModule
    ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent implements OnInit {
  public readonly projectService = inject(ProjectService);
  public readonly groupService = inject(GroupeService);

  @Output() changeMode: EventEmitter< { mode: Mode, project: Project | null, action: string } > = new EventEmitter< { mode: Mode, project: Project | null, action: string } >();
  @Input() project!: Project|null;

  groupListActive: Groupe[] = this.groupService.groups().filter((group: Groupe) => group.status === 1);
  newProject: Project = {
    id: this.generateUniqueID(),
    label: '',
    status: 1,
    selected: false
  };

  ngOnInit() {
    if (this.project){
      this.newProject = {...this.project}
    }
  }

  generateUniqueID(): number {
    const randomPart = Math.floor(Math.random() * 1000000);
    const timestampPart = Date.now();
    return timestampPart + randomPart;
  }

  resetMode(): void {
    this.project = null;

    const mode = {
      mode: Mode.LIST,
      project: null,
      action: ''
    };

    this.changeMode.emit(mode);
  }

  addOrUpdateProject(): void {
    if (this.project){
      this.projectService.updateProject(this.newProject)
    } else {
      this.projectService.addToList(this.newProject)
    }

    this.resetMode();
  }

  deleteProject(project: Project){
    const mode = {
      mode: Mode.DELETE,
      project: project,
      action: 'delete'
    };

    this.changeMode.emit(mode);
  }

  toggleStatus(project: Project){
    const mode = {
      mode: Mode.CONFIRMATION,
      project: project,
      action: 'toggle'
    };

    this.changeMode.emit(mode);
  }
}
