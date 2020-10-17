import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { LoginService } from 'src/services/Login.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'mil-splash',
  templateUrl: './Splash.component.html',
  styleUrls: ['./Splash.component.css']
})
export class SplashComponent implements OnInit {
  userName: string
  dialogRef: MatDialogRef<any>
  isLoggedIn: boolean = false

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private loginService: LoginService) { }
  
  ngOnInit(): void {
      this.showDialog()
      this.loginService.waitUntilLogged().subscribe(() => this.hideDialog())
  }

  public clickedPlayButton() {
    if(this.isLoggedIn) {
      $('.center').animate({ opacity: 0}, () => 
      this.router.navigate(['/gameboard'], {queryParams: {userName: this.userName}}))
    }
  }

  private showDialog() {
    this.dialogRef = this.dialog.open(LoginDialogComponent);
    this.dialogRef.disableClose = true
  }

  private hideDialog() {
    this.isLoggedIn = true
    this.dialogRef.close()
  }
}
