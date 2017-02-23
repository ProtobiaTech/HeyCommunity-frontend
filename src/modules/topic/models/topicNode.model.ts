export class TopicNode {
  constructor(
    public id: number,
    public parent_id: number,
    public name: string,
    public description: string,
    public created_at: string,
    public updated_at: string,
    public deleted_at: string
  ) {  }
}
