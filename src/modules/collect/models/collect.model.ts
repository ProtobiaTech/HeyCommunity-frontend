import { User } from '../../user/models/user.model';


export class Collect {
  constructor(
    public id: number,
    public user_id: number,
    // public author: User,
    public type_id: number,
    public name: string,
    public description: string,
    public follow_num: number,
    public moment_num: number,
    public created_at: string,
    public updated_at: string,
    public deleted_at: string
  ) {  }
}
