export class Group {
  id: string;
  name: string;
  createdById: string;
  constructor(id: string = '', name: string = '', createdById: string = '') {
    this.id = id;
    this.name = name;
    this.createdById = createdById;
  }

  isCreatedBy = (userId: string = ''): boolean => {
    return this.createdById === userId;
  };
}
