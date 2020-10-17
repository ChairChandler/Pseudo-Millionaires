import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionModel } from 'src/models/Question.model';
import { QuestionsService } from 'src/services/Questions.service';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-Gameboard',
  templateUrl: './Gameboard.component.html',
  styleUrls: ['./Gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  rewards: number[]
  userName: string;
  actualQuestion: QuestionModel;
  shuffledAnswers: {text: string, color: string}[]
  question_no: number = 1;
  readonly max_question_no = 12;

  constructor(
    private questionsService: QuestionsService,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.userName = params['userName'])
    this.prepareQuestion()
    this.initRewards()
  }

  randomizeColor(): string {
    let color = '#'
    for(let i=0; i<6; i++) {
      let digit: any = Math.floor(Math.random() * 16)
      switch(digit) {
        case 10: digit = 'a'
        case 11: digit = 'b'
        case 12: digit = 'c'
        case 13: digit = 'd'
        case 14: digit = 'e'
        case 15: digit = 'f'
        default: digit = digit.toString()
      }
      color += digit
    }
    return color
  }

  onSelectAnswer(answer: string): void {
    if(/*answer === this.actualQuestion.correct_answer*/1==1) {
      this.onCorrectdAnswer()
    } else if(this.actualQuestion.incorrect_answers.includes(answer)) {
      this.onInvalidAnswer()
    } else {
      throw Error('Answer not belongs to possible answers')
    }
  }

  private onCorrectdAnswer(): void {
    if(++this.question_no == this.max_question_no) {
      this.showDialog(WinnerDialog)
    } else {
      this.prepareQuestion()
    }
  }

  private onInvalidAnswer(): void {
    localStorage.setItem('reward', this.rewards[12-this.question_no].toString())
    this.showDialog(LoserDialog)
  }

  private prepareQuestion(): void {
    this.actualQuestion = this.questionsService.getQuestion(this.question_no)
    let { correct_answer, incorrect_answers } = this.actualQuestion
    let array: any[] = [correct_answer, ...incorrect_answers]
    array = array.map(text => ({text, color: this.randomizeColor()}))

    this.shuffledAnswers = this.shuffleArray(array)
  }

  private shuffleArray(array: any[]): any[] {
    const copyArray = array.slice()

    for(let i = 0; i < array.length; i++) {
      const shuffIndx = Math.floor(Math.random() * (array.length-1))
      //swap
      const temp = copyArray[i]
      copyArray[i] = copyArray[shuffIndx]
      copyArray[shuffIndx] = temp
    }

    return copyArray
  }

  private initRewards(): void {
    let reward = 1e6
    this.rewards = []
    for(let i=0; i<this.max_question_no; i++) {
      this.rewards.push(reward)
      reward = Math.floor(reward/2)
    }
  }

  private showDialog(dialogType: ComponentType<LoserDialog|WinnerDialog>) {
    const dialogRef = this.dialog.open(dialogType);

    dialogRef.afterClosed().subscribe(() => {
      this.questionsService.fetchQuestions(this.max_question_no).then(() =>
        window.location.reload()
      )
    });
  }
}

@Component({
  template: "You won 1 000 000$ !!!"
})
class WinnerDialog {}

@Component({
  template: "You lost :( <br>Prize: {{reward}} $"
})
class LoserDialog implements OnInit {
  reward: number
  
  ngOnInit(): void {
    this.reward = Number.parseInt(localStorage.getItem('reward'))
    localStorage.clear()
  }
}