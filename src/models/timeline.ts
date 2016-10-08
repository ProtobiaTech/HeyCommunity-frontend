import { User } from '../models/user';
import { TimelineImg } from '../models/timeline-img';
import { TimelineComment } from '../models/timeline-comment';


export class Timeline {

  constructor(
    public id: number,
    public author: User,
    public content: string,
    public imgs?: TimelineImg[],
    public comments?: TimelineComment[],
    public created_at?: string
  ) { }
}
