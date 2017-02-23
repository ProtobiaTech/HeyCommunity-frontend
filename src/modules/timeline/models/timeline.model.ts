import { User } from '../../user/models/user.model';
import { TimelineImg } from './timelineImg.model';
import { TimelineComment } from './timelineComment.model';


export class Timeline {
  constructor(
    public id: number,
    public user_id: number,
    public content: string,
    public author: User,
    public imgs: TimelineImg[],
    public comments: TimelineComment[],
    public video: string,
    public poster: string,
    public like_num: number,
    public view_num: number,
    public comment_num: number,
    public is_like: boolean,
    public created_at: string,
    public updated_at: string,
    public deleted_at: string
  ) {  }
}
