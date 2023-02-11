import { IChatInfo, IUser } from '../interfaces';

export type ChatWithUsers = IChatInfo & { users: Array<IUser & { role: string }> };
