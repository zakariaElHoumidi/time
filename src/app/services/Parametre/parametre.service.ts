import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  isProjectAndTacheRequired(): boolean {
    return false;
  }

  isProjectAndTacheNullable(): boolean {
    return false;
  }

  isProjectRequiredAndTacheNullable(): boolean {
    return false;
  }

  isProjectNullableAndTacheRequired(): boolean {
    return true;
  }
}
