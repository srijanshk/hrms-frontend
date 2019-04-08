export class SubjectModal{
    categorizedSubjectWithDescription : Categorized[];

    constructor(params: any) {
        if(params != null){
            this.categorizedSubjectWithDescription = [];
            this.categorizedSubjectWithDescription = params.questions;
            
        }
    }
}

class Categorized {
    category:string;
    subjects: Subject[];
}

class Subject{
    subject: string;
    description: string;
}