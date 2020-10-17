import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameboardComponent } from './Gameboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QuestionsService } from 'src/services/Questions.service';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    RouterModule
  ],
  declarations: [GameboardComponent],
  providers: [HttpClient, QuestionsService],
  exports: [GameboardComponent]
})
export class GameboardModule { }
