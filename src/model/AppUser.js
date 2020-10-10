export default class AppUser {
  constructor (id, userName, password, isAdmin, userRole) {
    this.id = id
    this.userName = userName
    this.password = password
    this.isAdmin = isAdmin
    this.userRole = userRole
  }
}
