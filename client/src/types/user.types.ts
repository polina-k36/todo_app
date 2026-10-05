export interface IUser {
  id: number;
  name: string;
  login: string;
  createdAt?: string;
}

export interface IEditPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IEditInfoUser {
  name: string;
  login: string;
}
