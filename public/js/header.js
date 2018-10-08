function Header() {
	this.createDom();
	this.loadModal();
	this.loadUser();
	this.addListener();
}

// 头部导航的布局DOM节点
Header.navTemplate = `<nav class="navbar navbar-default navbar-inverse">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="#">超市管理系统</a>
	    </div>

	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav">
	        <li class="active index-page"><a href="/">首页</a></li>
	
	      </ul>
	      
	      <ul class="nav navbar-nav navbar-right reg-login-link">
	        <li data-toggle="modal" data-target="#loginModal"><a href="#">登录</a></li>
	        <li data-toggle="modal" data-target="#regModal"><a href="#">注册</a></li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right hidden welcome-logout-link">
	        <li><a href="#">欢迎：</a></li>
	        <li><a href="javascript:void(0)" class="logout-link">注销</a></li>
	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>`; 

$.extend(Header.prototype, {
	// 创建导航DOM节点
	createDom() {
		// 将导航追加到 <header> 元素内部
		$(Header.navTemplate).appendTo("header");
	},
	// 生成使用的模态框
	loadModal() {
		// 注册
		new RegisterModal();
		// 登录
		new LoginModal();
	},
	// 加载用户登录信息
	loadUser() {
		// 从 sessionStorage 中获取登录成功的用户信息
		let user = sessionStorage.loginUser;
		if (!user) // 没有登录成功的用户，结束函数调用
			return;

		// 还原解析为JS中的对象
		user = JSON.parse(user);
		$(".reg-login-link").hide()
									  .next(".welcome-logout-link")
									  .removeClass("hidden")
									  .find("a:first").text("欢迎：" + user.username);
	},
	// 注册事件监听
	addListener() {
		// 点击“注销”链接，退出登录
		$(".logout-link").on("click", this.logoutHandler);
	},
	// 注销处理
	logoutHandler() {
		// 访问后端注销的接口
		// $.get("/api/user/logout");
		// 清除 sessionStorage 中保存的数据
		sessionStorage.removeItem("loginUser");
		// 刷新
		location.reload();
	}
});

// 创建头部Header对象
new Header();