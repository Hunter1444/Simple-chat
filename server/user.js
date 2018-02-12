const User = class User{
  constructor(login, password){
    this.login = login;
    this.password = password;
  }

  isGuest(){
    return false;
  }
}

module.exports = User;
