import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: Record<string, string | boolean> = {
    email: '',
    password: '',
    remember_me: false
  }

  loginFunc() {
    console.log(this.user);
  }
}
