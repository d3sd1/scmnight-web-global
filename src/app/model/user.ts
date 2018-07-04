export class User {
  private name: string;
  private password: string;

  constructor(name: string = null, password: string = null) {
    this.name = name;
    this.password = password;
  }
  public deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
