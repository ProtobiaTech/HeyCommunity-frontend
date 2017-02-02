import { User } from '../../user/models/user.model';
import { TopicComment } from './topicComment.model';


export class Topic {
  constructor(
    public id: number,
    public user_id: number,
    public topic_node_id: number,
    public title: string,
    public content: string,
    public star_num: number,
    public thumb_up_num: number,
    public thumb_down_num: number,
    public view_num: number,
    public comment_num: number,
    public created_at: string,
    public updated_at: string,
    public deleted_at: string,

    public is_thumb_up: number,
    public is_thumb_down: number,
    public is_star: number,
    public author: User,
    public comments: TopicComment[]
  ) {  }
}
