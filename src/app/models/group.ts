export class Group {
  id: string;
  name: string;
  createdBy: string;
  constructor(id: string = '', name: string = '', createdBy: string = '') {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
  }

  isCreatedBy = (userId: string = ''): boolean => {
    return this.createdBy === userId;
  };
}
