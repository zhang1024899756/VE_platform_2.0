// signin
exports.signin = function(req, res) {
	//res.send(req.query);
	var _user = req.query
	if (_user.identity == "admin") {
		if (_user.userName == "zhangxinyu" && _user.password == "123456") {
			res.send({
				key: "ok",
				userId: "123456"
			});
		} else {
			res.send({
				key: "-1"
			});
		}
	}

}