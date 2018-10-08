/* 用户DAO数据访问 */
const {User} = require("./model.js");

const UserDao = {
	save(userinfo) { // 保存用户信息
		userinfo.level = "VIP0";
		userinfo.reg_time = new Date();
		return new User(userinfo).save();
	},
	update(condition, userinfo) { // 更新用户信息

	},
	remove(condition) { // 删除用户信息

	},
	find(condition) { // 查找用户信息
		return User.find(condition);
	}
};

module.exports = UserDao;