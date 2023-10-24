const CONSTANTS = require("../constants");
const config = require("./../config/keys");
const { HashPassword, VerifyPassword } = require("../utils/Hashing.js");
const jwt = require("jsonwebtoken");

class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }


  async getUsers(req) {
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || "ASC";
    console.log("page",page);
    console.log("sort", sort);
    const pageSize = 10; // Number of items per page
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const response = {};
    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    const users = await this.userRepo.getUsers(skip, limit, sort);
    response.users =users;
    
    return response;
  }
}

module.exports = { UserService };
