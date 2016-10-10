export class TimelineComment {
  constructor(
    public id: number,
    public user_id: number,
    public timeline_id: number,
    public content: string,
    public created_at: string,
    public updated_at: string,
    public deleted_at: string
  ) { }
}
