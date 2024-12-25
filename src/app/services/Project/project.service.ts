import {Injectable, signal} from '@angular/core';
import {Project} from '../../interfaces/project.interface';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects = signal<Project[]>([]);

  constructor() {
    this.loadProjectsFromLocalStorage()
  }

  getProject(projectId: number): string|null{
    const isMatchingProject = (prj: Project) => prj.id == projectId;

    return this.projects().find(isMatchingProject)?.label || null;
  }

  // CRUD
  toggleStatus(projectID: number): void {
    let project = this.projects().find(
      (prj: Project) => prj.id == projectID
    );

    if (project) {
      project.status = project.status === 1 ? 0 : 1;


      this.projects.update((currentProjects) => {
        return currentProjects.map(
          (prj) => prj.id === project.id ? project : prj
        );
      });
    }
    this.updateLocalStorage();
  }

  addToList(project: Project): void {
    this.projects.update((currentProjects) => [...currentProjects, project]);
    this.updateLocalStorage();
  }

  updateProject(project: Project): void {
    this.projects.update((currentProjects) => {
      return currentProjects.map(
        (prj) => prj.id === project.id ? project : prj
      );
    });
    this.updateLocalStorage();
  }

  deleteProject(projectID: number): void {
    this.projects.update((currentProjects) => {
      return currentProjects.filter(
        (prj) => prj.id !== projectID
      );
    });
    this.updateLocalStorage();
  }

  deleteProjects(id_projects: number[]): void{
    id_projects.forEach(
      (id) => this.deleteProject(id)
    );
  }

  filterData(filterApply: { [key: string]: any }[] ): void {
    if (filterApply.length !== 0) {
      const filteredProjects = this.projects().filter((project: Project) => {
        return filterApply.every((filter) => {
          const [key, value] = Object.entries(filter)[0];

          if (key === 'label' && project.label) {
            return project.label.toLowerCase().includes(value.toLowerCase());
          }

          if (key === 'status') {
            return project.status === value;
          }

          return false;
        });
      });

      this.projects.set(filteredProjects);
    }
  }

  resetFilter(): void {
    this.loadProjectsFromLocalStorage()
  }

  ifAssocierWithProject(groupeID: number): boolean {
    if (this.projects().length == 0) {
      return false;
    }
    const results = this.projects().map((project: Project) => {
      return Number(project.group_id) !== groupeID
    })

    return !results.includes(true);
  }
  
  removeSelected(): void{
    this.projects().map((project: Project) => project.selected = false )
    this.updateLocalStorage()
  }

  // Local Storage
  public updateLocalStorage(): void {
    localStorage.setItem('projects', JSON.stringify(this.projects()));
  }

  private loadProjectsFromLocalStorage(): void {
    const projects_LS = localStorage.getItem('projects');
    if (projects_LS) {
      const parsedProjects = JSON.parse(projects_LS) as Project[];
      this.projects.set(parsedProjects);
    }
  }
}
