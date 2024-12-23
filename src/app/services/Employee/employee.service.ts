import {Injectable, signal} from '@angular/core';
import {Employee} from '../../interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  initialData: Employee[] = [
    {
      id: 1,
      firstname: 'zakaria',
      lastname: 'el houmidi',
      groupe_id: 1,
    },
    {
      id: 2,
      firstname: 'mourad',
      lastname: 'el houmidi',
      groupe_id: 1,
    },
    {
      id: 3,
      firstname: 'abdelkodouss',
      lastname: 'el houmidi',
      groupe_id: 1,
    },
    {
      id: 4,
      firstname: 'hicham',
      lastname: 'el houmidi',
      groupe_id: 2,
    }
  ];

  employee = signal(this.initialData || []);

  constructor() { }
}
