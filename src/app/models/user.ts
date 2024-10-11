export class User {
  id: string;
  username: string;
  email: string;
  apiToken: string;
  role: string;
  photo: string = '';

  constructor(
    id: string = '',
    username: string = '',
    email: string = '',
    apiToken: string = '',
    role: string = ''
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.apiToken = apiToken;
    this.role = role;
  }
}
