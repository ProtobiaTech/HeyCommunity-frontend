import { User } from '../models/user';


export class Topic {

  constructor(
    public id: number,
    public author: User,
    public content: string
  ) { }
}
