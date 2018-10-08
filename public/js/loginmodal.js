/* 注册-模态框 */
function LoginModal() {
	this.createDom();
	this.load();
	this.addListener();
}

// 模态框DOM节点模板
LoginModal.modalTemplate = `<div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
	        <h4 class="modal-title" id="loginModalLabel">用户登录</h4>
	      </div>
	      <div class="modal-body">
	      	<div class="alert alert-danger hidden login-error">用户名或密码错误</div>
	        <form class="login-form">
			  <div class="form-group">
			    <label for="loginUsername">用户名</label>
			    <input type="text" class="form-control" name="username" id="loginUsername" placeholder="请输入用户名">
			  </div>
			  <div class="form-group">
			    <label for="loginPassword">密码</label>
			    <input type="password" class="form-control" name="password" id="loginPassword" placeholder="请输入密码">
			  </div>
			  <div class="form-group">
			    <label for="loginCaptcha">验证码</label>
			    <div class="input-group">
			      <input type="text" class="form-control" name="captcha" id="loginCaptcha1" placeholder="请输入验证码">
				  <span class="input-group-addon" id="captcha-info">正确</span>
				</div>
				<div class="captcha-container"></div>
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary btn-login">登录</button>
	      </div>
	    </div>
	  </div>
	</div>`;

$.extend(LoginModal.prototype, {
	// 创建DOM节点
	createDom() {
		$(LoginModal.modalTemplate).appendTo("body");
	},
	// 页面加载
	load() {
		// 显示验证码
		$.getJSON("/api/captcha", (data)=>{
			$(".captcha-container").html(data.res_body.data);
		});
	},
	// 注册事件监听
	addListener() {
		// 登录
		$(".btn-login").on("click", this.loginHandler);
		// 刷新验证码
		$(".captcha-container").on("click", this.load);
		// 验证码文本框失去焦点，校验
		$("#loginCaptcha").on("blur", this.verify)
	},
	// 校验验证码
	verify() {
		$.getJSON("/api/verify_captcha", {captcha: $("#loginCaptcha").val()}, (data)=>{
			if (data.res_body.valid) {
				$("#captcha-info").text("正确")
			} else {
				$("#captcha-info").text("错误")
			}
		});
	},	
	// 登录处理
	loginHandler() {
		// todo：表单校验
		const url = "/api/user/login", // URL
			data = $(".login-form").serialize(); // 向服务器提交的数据
		console.log(data);
		$.post(url, data, (data)=>{
			console.log(data);
			// 处理响应数据
			if (data.res_code === 1) { // 登录成功
				// 将登录成功的用户信息保存到 sessionStorage 中
				sessionStorage.loginUser = JSON.stringify(data.res_body.data);
				// 刷新页面
				window.location.reload();
			} else { // 登录失败
				$(".login-error").removeClass("hidden");
			}
		});
	}
});
