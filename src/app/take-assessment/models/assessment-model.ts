import {QuestionAnswerModel} from './question-answer-model'

export class Assessment {
    questionAnswers : QuestionAnswerModel[];

    constructor(data: any) {
        if (data !== null){
            this.questionAnswers = [];
            data.assessment.forEach(question => {
                this.questionAnswers.push(new QuestionAnswerModel(question))
            });
        }
    }
}