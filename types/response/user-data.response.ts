import { userRoleEnum } from "../enums/user-role.enum";

export interface UserDataResponse {
  id: string;
  name: string;
  email: string;
  userRole: userRoleEnum;
  position: string;
  contactNumber: string;
  companyName: string;
}
