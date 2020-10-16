import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/models/Question.model';
import QuestionsService from 'src/services/Questions.service';

@Component({
  selector: 'app-Gameboard',
  templateUrl: './Gameboard.component.html',
  styleUrls: ['./Gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  questions: QuestionModel[]
  private readonly questionsAmount = 12
  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.questionsService.getQuestions(this.questionsAmount).then(q => this.questions = q)
  }
}
