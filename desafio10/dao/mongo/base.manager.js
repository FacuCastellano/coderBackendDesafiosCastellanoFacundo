const logger = require('../../logger')
const fs = require('fs')
class BaseManager {
  
  constructor(model) {
    this.model = model
    // this.a = function () {
    //   console.log("baseManager de DAO mongo")
    // }
    // this.a()
  }
  
  async add(entity) {
    return await this.model.create(entity)
  }

  async getAll(filter = {}) {
    return this.model.find(filter)
  }

  async getById(id) {
    const entity = await this.model.findById(id)
    if(!entity){
      logger.error(
        `${
          err.message
        }file: ${__filename} - function: getById - Date:${
          new Date().toISOString
        }`
      )
    return null
    }
    return entity
  }

  async updateById(id, entityUpdated) {
    return await this.model.findOneAndUpdate({ _id: id }, entityUpdated, {
      new: true,
    })
  }

  async deleteById(id) {
    return await this.model.deleteOne({ _id: id })
  }
}

module.exports = BaseManager
