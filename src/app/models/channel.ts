export class Channel {
  id: string;
  name: string;
  groupId: string;
  constructor(id: string = '', name: string = '', groupId: string = '') {
    this.id = id;
    this.name = name;
    this.groupId = groupId;
  }
}
