const userModel = require('./models/user.model')


class UserManager{

  async add(user) {
    return await userModel.create(user)
  }

}

module.exports = new UserManager()

