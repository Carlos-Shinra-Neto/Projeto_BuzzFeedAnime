import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit{
title:string = ""

questions: any
questionSelected: any

answers:string[] = []
answersSelected: string = ""

questionIndex:number = 0
questionMaxIndex:number = 0

finished: boolean = false
hideQuestion: boolean = true


constructor(){}
ngOnInit(): void {
   if(quizz_questions){
    this.finished = false;
    this.title = quizz_questions.title;

    this.questions = quizz_questions.questions;
    this.questionIndex = 0;
    this.questionSelected = this.questions[this.questionIndex];
    this.questionMaxIndex = this.questions.length;

    console.log(this.questionIndex, this.questionMaxIndex);
   }
}

playerChoice(value:string){
  this.answers.push(value);
  console.log(this.answers);
}

async nextStep(){
  this.questionIndex += 1;
  console.log(this.questionIndex)
  if(this.questionMaxIndex > this.questionIndex){
    this.questionSelected = this.questions[this.questionIndex];
    console.log(this.questionIndex)
  } else {
    this.hideQuestion = false;
    this.finished = true;
  }
}

async stepBack(){
  console.log(this.questionIndex);
  if(this.questionIndex == 0){
    this.questionIndex = 1;
  }

  if(this.questionIndex < this.questionMaxIndex){
    this.questionIndex -= 1;
    this.answers.pop();
    this.questionSelected = this.questions[this.questionIndex];
    console.log(this.questionIndex)
    console.log(!this.answers)
  }
}

async restartQuizz(){

  if(this.questionIndex == this.questionMaxIndex){
    this.questionIndex = 0;
    this.questionSelected = this.questions[this.questionIndex];
    this.answers = [];
    this.hideQuestion = true;
    this.finished = false;
    console.log(this.questionIndex, this.answers, this.questionMaxIndex)
  }
}
}

