import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './Splash.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogModule } from '../login-dialog/login-dialog.module';
import { LoginService } from 'src/services/Login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    LoginDialogModule
  ],
  declarations: [SplashComponent],
  exports: [SplashComponent]
})
export class SplashModule { }
