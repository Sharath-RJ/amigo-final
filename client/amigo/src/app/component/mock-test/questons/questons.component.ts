import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questons',
  templateUrl: './questons.component.html',
  styleUrl: './questons.component.css',
})
export class QuestonsComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  userAnswers: any = {};
  loading: boolean = true;
  resultloaing: boolean = true;
  feedback!: string;
  proficiency_level!: string;
  star_rating!: number;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this._http.get(`${environment.apiUrl}/mock/getQuestions`).subscribe(
      (res: any) => {
        this.questions = res;
        this.loading = false;
      },
      (err) => {
        console.log('error', err);
        this.loading = false;
      }
    );
  }

  answerQuestion(option: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.userAnswers[currentQuestion.question_number] = option;
    if (option === currentQuestion.correct_answer) {
      this.score++;
    }
    this.currentQuestionIndex++;
    console.log(this.userAnswers);

    if (this.currentQuestionIndex == this.questions.length) {
      this._http
        .post(`${environment.apiUrl}/mock/submitAnswers`, {
          Questions: this.questions,
          Answers: this.userAnswers,
          score: this.score,
        })
        .subscribe(
          (res: any) => {
            console.log('res', res);
            this.resultloaing = false;
            this.proficiency_level = res.proficiency_level;
            this.feedback = res.feedback;
           this.star_rating = res.star_rating;
           
          },
          (err) => {
            this.resultloaing = false;
            console.log('error', err);
          }
        );
    }
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = {};
  }
}
