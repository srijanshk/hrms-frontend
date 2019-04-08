export class User {
  email: string;
  role: {
    type: String,
    enum: ['employee', 'manager', 'admin', 'hr']
  };
  fullname: string;
  contactNo: number;
  post: string;
  branch: [];
  lineManager: string;
  Project: {
    type: String,
    default: 'Bench'
  };
}
