export class User {
  constructor(
    // public email: string,
    public access_token: string,
    public token_type: string,
    private expires_in: number,
    private user_id:string,
    private expiration_Time: Date,
    public user_type:string
  ) {}

  get token() {
    if (!this.expiration_Time || new Date() > this.expiration_Time) {
      return null;
    }
    return this.access_token;
  }
}
