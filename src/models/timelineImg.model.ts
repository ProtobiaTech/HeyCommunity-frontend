export class TimelineImg {
  constructor(
    public id: number,
    public user_id: number,
    public timeline_id: number,
    public uri: string,
    public created_at: string,
    public updated_at: string,
    public deleted_at: string
  ) { }
}
