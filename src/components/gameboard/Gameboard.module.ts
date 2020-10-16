import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameboardComponent } from './Gameboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import QuestionsService from 'src/services/Questions.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [GameboardComponent],
  providers: [HttpClient, QuestionsService]
})
export class GameboardModule { }
