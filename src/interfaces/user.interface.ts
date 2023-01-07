export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string | null;
}
