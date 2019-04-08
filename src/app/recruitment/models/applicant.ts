import { Position } from "../models/position";

export class Applicant {
  id: string;
  name: string;
  applyingFor: Position;
  description: string;
  stage: string;
  resume: string;
  email: string;
  phone: string;
  appliedDate: Date;
  remarks: string;
}
