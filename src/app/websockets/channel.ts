export class Channel {
  name: string;
  data: any;
  dataClassName: string;
  constructor(name: string = null, data: any = null, dataClassName: string = null) {
    this.name = name;
    this.data = data;
    this.dataClassName = dataClassName;
  }
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
