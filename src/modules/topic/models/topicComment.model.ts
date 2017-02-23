// import { User } from '../../user/models/user.model';


export class TopicComment {
  constructor(
    public id: number,
    public user_id: number,
    public topic_id: number,
    public parent_id: number,
    public content: string,
    public created_at: string,
    public updated_at: string,
    public deleted_at: string
  ) {  }
}
