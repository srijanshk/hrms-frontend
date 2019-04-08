export class UserInfo {
  fullname: string;
  email: string;
  post: string;
  Project: string;
  branch: [];
  lineManager: string;
  dob: Date;
  nationality: string;
  contactNo: number;
  emergencycontact: string;
  emergencycontactno: number;
   permanentaddress: string;
      temporaryaddress: string;
      gender: string;
      religion: string;
      citizenshipno: number;
      fathername: string;
      mothername: string;
      familycontactno: string;
      status: string;
      spouse: string;
      childname: string;
      bloodGroup: string;
      medicalHistory: string;
      education: [
        {institutionName: string; },
        {level: string; },
        {yearGraduated: number; },
        { board: string; },
        {faculty: string; }
      ];
      experience: [
         {company: string; },
        {degination: string; },
        {fromYear: Date; },
        {toYear: Date; },
        {refrence: string; }
      ];
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
      github: string;
      skype: string;
      certification: [
        {coursetaken: string; },
        {dateofcompletion: Date; }
      ];
}
