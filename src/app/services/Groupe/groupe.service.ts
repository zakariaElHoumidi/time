import {Injectable, signal} from '@angular/core';
import {Groupe} from '../../interfaces/groupe.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  groups = signal<Groupe[]>([]);

  constructor() {
    this.loadGroupsFromLocalStorage()
  }

  getGroup(groupId: number): string|null{
    const isMatchingGroup = (grp: Groupe) => grp.id == groupId;

    return this.groups().find(isMatchingGroup)?.label || null;
  }

  // CRUD
  addToList(group: Groupe): void {
    this.groups.update((currentGroups) => [...currentGroups, group]);
    this.updateLocalStorage();
  }

  updateGroup(group: Groupe): void {
    this.groups.update((currentGroups) => {
      return currentGroups.map(
        (grp) => grp.id === group.id ? group : grp
      );
    });
    this.updateLocalStorage();
  }

  deleteGroup(groupID: number): void {
    this.groups.update((currentGroups) => {
      return currentGroups.filter(
        (grp) => grp.id !== groupID
      );
    });
    this.updateLocalStorage();
  }

  deleteGroups(id_groups: number[]): void{
    id_groups.forEach(
      (id) => this.deleteGroup(id)
    );
  }

  toggleStatus(groupID: number): void {
    let group = this.groups().find(
      (grp: Groupe) => grp.id == groupID
    );

    if (group) {
      group.status = group.status === 1 ? 0 : 1;

      this.groups.update((currentGroups) => {
        return currentGroups.map(
          (grp) => grp.id === group.id ? group : grp
        );
      });
    }
    this.updateLocalStorage();
  }

  filterData(filterApply: { [key: string]: any }[] ): void {

    if (filterApply.length === 0) {
      this.loadGroupsFromLocalStorage();
      return;
    }

    filterApply.forEach((f) => {
      const keys = Object.keys(f)
      const values = Object.values(f);

      const filtrageGroups = this.groups().filter((groupe: Groupe) => {
        return keys.every((key, index) => {
          console.log(keys)
          // if () {
          //
          // }
          if (typeof groupe[key as keyof Groupe] === 'string') {
            return (groupe[key as keyof Groupe] as string).includes(values[index])
          }
          return groupe[key as keyof Groupe] === values[index];
        })
      });

      this.groups.set(filtrageGroups);
    });
  }

  resetFilter(): void {
    this.loadGroupsFromLocalStorage()
  }

  // Local Storage
  public updateLocalStorage(): void {
    localStorage.setItem('groups', JSON.stringify(this.groups()));
  }

  private loadGroupsFromLocalStorage(): void {
    const groups_LS = localStorage.getItem('groups');
    if (groups_LS) {
      const parsedGroups = JSON.parse(groups_LS) as Groupe[];
      this.groups.set(parsedGroups);
    }
  }
}
