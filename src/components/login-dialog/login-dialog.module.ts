import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from './login-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [LoginDialogComponent],
  exports: [LoginDialogComponent]
})
export class LoginDialogModule { }
