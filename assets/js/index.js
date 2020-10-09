// 入口函数
$(function() {
    getUserInfo();
    var layer = layui.layer;
    $("#btnLogout").on('click', function() {
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清楚token
            localStorage.removeItem('token');
            location.href = "/login.html"
            layer.close(index);
        });
    })
});
// 获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染头像
    if (user.user_pic !== null) {
        // 渲染头像
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").show().html(name[0].toUpperCase());
    }
}