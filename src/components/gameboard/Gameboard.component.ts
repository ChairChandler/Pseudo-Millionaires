import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionModel } from 'src/models/Question.model';
import { QuestionsService } from 'src/services/Questions.service';

@Component({
  selector: 'app-Gameboard',
  templateUrl: './Gameboard.component.html',
  styleUrls: ['./Gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  playerState: 'winner' | 'loser' | null = null
  userName: string;
  actualQuestion: QuestionModel;
  shuffledAnswers: {text: string, color: string}[]
  question_no: number = 1;
  readonly max_question_no: 12;

  constructor(
    private questionsService: QuestionsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.userName = params['userName'])
    this.prepareQuestion()
  }

  onSelectAnswer(answer: string): void {
    if(answer === this.actualQuestion.correct_answer) {
      this.onCorrectdAnswer()
    } else if(this.actualQuestion.incorrect_answers.includes(answer)) {
      this.onInvalidAnswer()
    } else {
      throw Error('Answer not belongs to possible answers')
    }
  }

  private onCorrectdAnswer(): void {
    if(++this.question_no == this.max_question_no) {
      this.playerState = 'winner'
    } else {
      this.prepareQuestion()
    }
  }

  private onInvalidAnswer(): void {
    this.playerState = 'loser'
  }

  private prepareQuestion(): void {
    this.actualQuestion = this.questionsService.getQuestion(this.question_no)
    let { correct_answer, incorrect_answers } = this.actualQuestion
    let array: any[] = [correct_answer, ...incorrect_answers]
    let color = 'red'
    
    array = array.map(text => {
      const r = { text, color }
      color = color == 'red' ? 'green' : 'red'
    })

    this.shuffledAnswers = this.shuffleArray(array)
    console.log(this.shuffleArray)
  }

  private shuffleArray(array: any[]): any[] {
    const copyArray = array.slice()

    for(let i = 0; i < array.length; i++) {
      let shuffIndx
      do {
        shuffIndx = Math.floor(Math.random() * (array.length-1))
      } while(shuffIndx == i)

      copyArray[i], copyArray[shuffIndx] = copyArray[shuffIndx], copyArray[i]
    }

    return copyArray
  }
}
