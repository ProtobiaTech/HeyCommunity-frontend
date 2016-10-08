import { User } from '../models/user';
import { Timeline } from '../models/timeline';


export class Notice {

  constructor(
    public id: number,
    public owner: User,
    public initiator: User,
    public entity: Timeline
  ) { }
}
