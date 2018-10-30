

export class User {
  email: string;
  password: string;
  role: {
    type: String,
    enum: ['employee', 'manager', 'admin'],
    default: 'employee'
  };


}
