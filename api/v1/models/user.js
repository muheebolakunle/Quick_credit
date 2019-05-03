export default class Users {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.address = user.address;
    this.status = user.status;
    this.isAdmin = user.isAdmin;
  }
}