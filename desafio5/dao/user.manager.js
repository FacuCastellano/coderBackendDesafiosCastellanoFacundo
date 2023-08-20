const userModel = require('./models/user.model')


class UserManager{

  async add(user) {
    return await userModel.create(user)
  }

  async getByMail(mail){
    return await userModel.findOne({email: mail})
  }


}

module.exports = new UserManager()

