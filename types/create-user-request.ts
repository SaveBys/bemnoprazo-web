export interface CreateUserRequest {
  companyName: string;
  companyDocument: string;
  accountResponsible: string;
  contactNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}