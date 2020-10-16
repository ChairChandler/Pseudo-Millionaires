import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameboardComponent } from './Gameboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QuestionsService } from 'src/services/Questions.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatGridListModule,
    RouterModule
  ],
  declarations: [GameboardComponent],
  providers: [ActivatedRoute, HttpClient, QuestionsService],
  exports: [GameboardComponent]
})
export class GameboardModule { }
