$(function() {
    // 登录 和注册 页面切换
    $(".link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $(".link_login").on("click", function() {
        $(".reg-box").hide();
        $(".login-box ").show();
    });
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $(".reg-box [name=password]").val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });
    //给注册表单添加监听事件
    $("#form_reg").submit(function(e) {
        //阻止默认提交事件
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $(".link_login").click();
            }
        })
    });
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})