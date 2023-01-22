import { IUser } from './user.interface';

export interface IChatInfo {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: {
    user: IUser;
    time: string;
    content: string;
  } | null;
}
