import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionModel } from 'src/models/Question.model';

@Injectable()
export default class QuestionsService {
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

    public async getQuestions(amount: number): Promise<QuestionModel[]> {
        try {
            const token = await this.tokenPromise
            
            let url = this.questionsUrl
            url = url.replace('$AMOUNT', amount.toString()).replace('$TOKEN', token)

            return new Promise((resolve, reject) => {
                this.http.get(url).subscribe(response => {
                    if(response['response_code'] as number) {
                        reject(`Error during fetch url: ${url}, status code: ${response['status_code']}`)
                    } else {
                        resolve(response['results'])
                    }
                })
            })
        } catch(error) {
            alert(error)
        }
    }   
}