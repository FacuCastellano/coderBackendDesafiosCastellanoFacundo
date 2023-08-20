const userModel = require('./models/user.model')


class UserManager{

  async add(user) {
    return await userModel.create(user)
  }

  async getByMail(mail){
    return await userModel.findOne({email: mail})
  }

  async verifyUserPass({email,password}){
    const info = await userModel.findOne({email: email},{password:1,_id:0,user: '$_id',email:1}).lean()
    if(info.password !== password){
      return false
    }
    info.user = info.user.toString()
    return {id: info.user,email:info.email}
  }


}

module.exports = new UserManager()

