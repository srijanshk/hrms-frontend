import { Position } from "../models/position";
import { Interviewer } from "../models/interviewer";

export class Applicant {
  id: string;
  name: string;
  email: string;
  experience: string;
  address: string;
  citizenship: string;
  documents: File;
  remarks: string;
  photo: File;
  position: Position;
  interviewer: Interviewer;
  isEligible: boolean;
  status: string;
  appliedDate: Date;
  rating: string;
}
