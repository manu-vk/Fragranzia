const userModel = require("../model/userModel")

const getUsers = (req, res) => {
    const users = userModel.find()
    res.status(200).json(users);
}

module.exports = { getUsers }