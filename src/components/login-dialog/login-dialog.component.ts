import { Component } from '@angular/core';
import { LoginService } from 'src/services/Login.service';

@Component({
  selector: 'mil-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  login: string
  password: string

  constructor(private loginService: LoginService) { }

  clickedLogin(): void {
    this.loginService.setLogged()
  }
}
