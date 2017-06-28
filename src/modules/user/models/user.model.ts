export class User {
  constructor(
    public id: number,
    public nickname: string,
    public username: string,
    public avatar: string,
    public bio: string,
    public gender: number,
    public email: string,
    public phone: string,
    public is_admin: number,
    public created_at: string,
    public updated_at: string,
    public deleted_at: string
  ) {  }
}
