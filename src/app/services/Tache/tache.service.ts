import {Injectable, signal} from '@angular/core';
import {Tache} from '../../interfaces/tache.interface';
import {Project} from '../../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  taches = signal<Tache[]>([]);

  constructor() {
    this.loadTachesFromLocalStorage()
  }

  listByProject(projectId:number):Tache[]{
    return this.taches().filter(
      (tache:Tache)=> tache.project_id == projectId
    );
  }

  // CRUD
  toggleStatus(tacheID: number): void {
    let tache = this.taches().find(
      (tch: Tache) => tch.id == tacheID
    );

    if (tache) {
      tache.status = tache.status === 1 ? 0 : 1;


      this.taches.update((currentTaches) => {
        return currentTaches.map(
          (tch) => tch.id === tache.id ? tache : tch
        );
      });
    }
    this.updateLocalStorage();
  }

  addToList(tache: Tache): void {
    this.taches.update((currentTaches) => [...currentTaches, tache]);
    this.updateLocalStorage();
  }

  updateTache(tache: Tache): void {
    this.taches.update((currentTaches) => {
      return currentTaches.map(
        (tch) => tch.id === tache.id ? tache : tch
      );
    });
    this.updateLocalStorage();
  }

  deleteTache(tacheID: number): void {
    this.taches.update((currentTaches) => {
      return currentTaches.filter(
        (tch) => tch.id !== tacheID
      );
    });
    this.updateLocalStorage();
  }

  deleteTaches(id_taches: number[]): void{
    id_taches.forEach(
      (id) => this.deleteTache(id)
    );
  }


  filterData(filterApply: { [key: string]: any }[] ): void {
    if (filterApply.length !== 0) {
      const filteredTaches = this.taches().filter((tache: Tache) => {
        return filterApply.every((filter) => {
          const [key, value] = Object.entries(filter)[0];

          if (key === 'label' && tache.label) {
            return tache.label.toLowerCase().includes(value.toLowerCase());
          }

          if (key === 'status') {
            return tache.status === value;
          }

          return false;
        });
      });

      this.taches.set(filteredTaches);
    }
  }

  resetFilter(): void {
    this.loadTachesFromLocalStorage()
  }

  ifAssocierWithTache(projectID: number): boolean {
    if (this.taches().length == 0) {
      return false;
    }
    const results = this.taches().map((tache: Tache) => {
      return Number(tache.project_id) !== projectID
    })

    return !results.includes(true);
  }

  // Local Storage
  public updateLocalStorage(): void {
    localStorage.setItem('taches', JSON.stringify(this.taches()));
  }

  private loadTachesFromLocalStorage(): void {
    const taches_LS = localStorage.getItem('taches');
    if (taches_LS) {
      const parsedTaches = JSON.parse(taches_LS) as Tache[];
      this.taches.set(parsedTaches);
    }
  }

  getTache(tacheId: number): string|null{
    if (tacheId === null || tacheId === undefined) {
      return null;
    }

    const isMatchingTache = (tch: Tache) => tch.id === tacheId;

    return this.taches().find(isMatchingTache)?.label || null;
  }
}
