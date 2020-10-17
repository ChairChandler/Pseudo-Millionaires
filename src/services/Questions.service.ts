import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionModel } from 'src/models/Question.model';

@Injectable()
export class QuestionsService {
    private tokenPromise: Promise<string>
    private readonly sessionTokenUrl: string = 'https://opentdb.com/api_token.php?command=request'
    private readonly questionsUrl: string = 'https://opentdb.com/api.php?amount=$AMOUNT&token=$TOKEN'
    
    constructor(private http: HttpClient) { 
        this.tokenPromise = this.getToken()
    }

    private getToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(this.sessionTokenUrl).subscribe(response => {
                if(response['response_code'] as number) {
                    reject(`Error during fetch url: ${this.sessionTokenUrl}, status code: ${response['status_code']}`)
                } else {
                    resolve(response['token'])
                }
            }, reject)
        })
    }
 
    private sortQuestions(questions: QuestionModel[]): QuestionModel[] {
        const InsertBefore = -1, InsertAfter = 1;
        return questions.sort((a, b) => 
            a.difficulty === 'easy' && (b.difficulty === 'medium' || b.difficulty === 'hard') ? InsertBefore :
            a.difficulty === 'medium' &&  b.difficulty === 'hard' ? InsertBefore : InsertAfter
        )
    }

    private parseQuestions(questions: QuestionModel[]): QuestionModel[] {
        const replaceIfNessesary = txt => txt.replace(/[^a-zA-Z0-9 _-]+.*;/, '')
        return questions.map(q => {
            q.question = replaceIfNessesary(q.question)
            q.correct_answer = replaceIfNessesary(q.correct_answer)
            q.incorrect_answers = q.incorrect_answers.map(replaceIfNessesary)
            return q;
        })
    }

    //obviously it can returns array of questions
    public async fetchQuestions(amount: number): Promise<void> {
        try {
            const token = await this.tokenPromise
            
            let url = this.questionsUrl
            url = url.replace('$AMOUNT', amount.toString()).replace('$TOKEN', token)

            return new Promise((resolve, reject) => {
                this.http.get(url).subscribe(response => {
                    if(response['response_code'] as number) {
                        reject(`Error during fetch url: ${url}, status code: ${response['status_code']}`)
                    } else {
                        let questions = this.sortQuestions(response['results'] as QuestionModel[])
                        questions = this.parseQuestions(questions)
                        for(const [indx, obj] of Object.entries(questions)) {
                            localStorage.setItem(`question_${indx}`, JSON.stringify(obj))
                        }
                        resolve()
                    }
                })
            })
        } catch(error) {
            alert(error)
        }
    }
    
    public getQuestion(question_no: number): QuestionModel {
        // has to be converted first to unknown from string, it has to be sure if conversion was intended 
        return JSON.parse(localStorage.getItem(`question_${question_no}`))
    }
}