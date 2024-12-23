import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {
  shouldSelectProject(): boolean {
    return true;
  }

  shouldSelectTache(): boolean {
    return true;
  }
}
