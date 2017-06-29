import { User } from '../../user/models/user.model';
import { Timeline } from '../../timeline/models/timeline.model';


export class Collect {
  constructor(
    public id: number,
    public user_id: number,
    public type_id: number,
    public avatar: string,
    public name: string,
    public description: string,
    public follow_num: number,
    public moment_num: number,
    public created_at: string,
    public updated_at: string,
    public deleted_at: string,
    public author: User,
    public user_follows: User[],
    public timelines: Timeline[]
  ) {  }
}
