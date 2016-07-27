export class Timeline {
  constructor(
    public id: number,
    public content: string,
    public is_like: boolean,
    public like_num: number,
    public comment_num: number
  ) {  }
}
