import { User } from '../models/user';
import { Timeline } from '../models/timeline';


export class TimelineComment {

  constructor(
    public id: number,
    public content: string,
    public author: User
  ) { }
}
