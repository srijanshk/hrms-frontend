export class QuestionListModal{
    questions: Question[];

    constructor(params) {
        if(params != null){
            // this.questions = params.assessment;   this is when reading from json file
            this.questions = params;
        }
    }
}

class Question{
    questionId: number;
    question: string;
    answers : string[];
    correctAnswer: string;
    type: string;
    time: number;
}