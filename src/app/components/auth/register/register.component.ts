import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  user: Record<string, string> = {
    email: '',
    password: '',
    confirm_password: '',
  }

  registerFunc() {
    console.log(this.user);
  }
}
