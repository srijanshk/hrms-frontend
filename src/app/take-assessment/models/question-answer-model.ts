export class QuestionAnswerModel {

    questionId: number;
    question: string;
    answers: string[];
    selectedAnswer: string;
    correctAnswer: string;
    // correctAnswer: string[];
    time: number;

    constructor(data: any) {
        data = data || {};
        this.questionId = data.questionId;
        this.question = data.question;
        this.answers = [];
        data.answers.forEach(choice => {
            this.answers.push(choice)
        });
        // start of update
        //  this.correctAnswer = [];
        //  data.correctAnswer.forEach(choice => {
        //      this.correctAnswer.push(choice)
        //  });
        // end of update

        this.correctAnswer = data.correctAnswer;
        this.time = data.time;
    }
}
