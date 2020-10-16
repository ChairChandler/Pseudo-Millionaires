import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/services/Questions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly questionsAmount = 12
  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.questionsService.fetchQuestions(this.questionsAmount)
  }
}
