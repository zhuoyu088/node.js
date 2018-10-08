// 引入 mongoose
const mongoose = require("mongoose");

// 连接 mongodb 数据库
mongoose.connect('mongodb://localhost/proj_1805');

// 创建用户Schema、职位Schema
const userSchema = new mongoose.Schema({
	username : String,
	password : String,
	email : String,
	level : String,
	reg_time : Date
});

const User = mongoose.model("user", userSchema);
// 根据职位Schema创建职位模型
const Position = mongoose.model("position", positionSchema);

module.exports = {User, Position};