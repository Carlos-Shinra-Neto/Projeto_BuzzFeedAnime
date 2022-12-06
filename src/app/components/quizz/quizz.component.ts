import { ThisReceiver } from '@angular/compiler';
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

img:string = ""


constructor(){}
ngOnInit(): void {
   if(quizz_questions){
    this.finished = false;
    this.title = quizz_questions.title;

    this.questions = quizz_questions.questions;
    this.questionIndex = 0;
    this.questionSelected = this.questions[this.questionIndex];
    this.questionMaxIndex = this.questions.length;

    console.log("Questao que o jogador esta", this.questionIndex,"Numero maxiom de questoes:", this.questionMaxIndex);
   }
}

playerChoice(value:string){
  this.answers.push(value);
  console.log("resultado:", this.answers);
}

async nextStep(){
  this.questionIndex += 1;
  console.log(this.questionIndex)
  if(this.questionMaxIndex > this.questionIndex){
    this.questionSelected = this.questions[this.questionIndex];
    console.log("Qual questao esta:", this.questionIndex)
  } else {
    const finalAnswer:string = await this.checkResult(this.answers);
    this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    const finalImg:string = await this.changePhoto(this.img)
    this.img = finalImg;
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
    console.log("Qual questao esta:", this.questionIndex)
    console.log("Resultado:", this.answers)
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

async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr) =>{
      if( arr.filter(item => item === previous).length > arr.filter(item => item === current).length ){
        return previous;
      }
      else{
        return current;
      }
   })
   return result;
   console.log(result);
}

async changePhoto(img:string){
  let finalAnswer = await this.checkResult(this.answers)
  this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
  this.img = "../../../assets/imgs/"
  if(finalAnswer === "K"){
   return this.img = "../../../assets/imgs/Rensuke_Kunigami.webp"
  }
   else if(finalAnswer === "B") {
    return this.img = "../../../assets/imgs/Meguru_Bachira.webp"
  }
   else if(finalAnswer === "R") {
    return this.img = "../../../assets/imgs/Jingo_Raichi.webp"
  }
   else if(finalAnswer === "Y") {
    return this.img = "../../../assets/imgs/Yoichi_Isagi.webp"
  }
   else if(finalAnswer === "W") {
    return this.img = "../../../assets/imgs/Wataru_Kuon.webp"
  }
   else if(finalAnswer === "C") {
    return this.img = "../../../assets/imgs/Hyoma_Chigiri.webp"
  }
   else {
    return this.img = "../../../assets/imgs/Gin_Gagamaru.webp"
  }
 
}

}

