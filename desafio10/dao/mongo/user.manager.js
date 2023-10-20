const mongoose = require('mongoose')
const BaseManager = require('./base.manager')
const userModel = require('./models/user.model')
const cartManager = require('./cart.manager')

class UserManager extends BaseManager {
  constructor() {
    super(userModel)
  }

  async getByIdForPassport(userId) {
    const userRaw = await this.model.findById(userId).lean()
    const { __v, password, ...rest } = userRaw

    const user = { ...rest }

    if (user.email === 'adminCoder@coder.com') {
      user.role = 'admin'
      user.isAdmin = true
    } else {
      user.role = 'user'
      user.isAdmin = false
    }

    const cart = await cartManager.getByUserId(userId)

    let cartId
    if (!cart) {
      const userCart = await cartManager.add({ user:userId })
      cartId = userCart._id.toString()
    } else {
      cartId = cart._id.toString()
    }
    user.cartId = cartId

    return user
  }

  async getByMail(email) {
    return await this.model.findOne({ email })
  }

  async getInfoByMail(email) {
    const user = await this.model.findOne({ email }).lean()
    const { _id, password, __v, ...rest } = user
    return rest
  }

}

module.exports = new UserManager()
