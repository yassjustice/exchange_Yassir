class UserRepository {
    constructor(userModel) {
      this.userModel = userModel;
    }
    async getUsers(skip, limit, sort) {
      const users = await this.userModel
        .aggregate([{ $sort: { creationDate: -1 } }])
        .skip(skip)
        .limit(limit)
        .exec();
      console.log(users.length);
      return users;
    }
  }
  
  module.exports = { UserRepository };
  