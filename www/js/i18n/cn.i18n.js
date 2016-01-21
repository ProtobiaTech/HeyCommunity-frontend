HeyCommunity

.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('cn', {
        //
        // Common
        // ------------------------------
        SETUP:              '设置',
        PLEASE_SIGN_IN:     '请登录',
        SIGN_UP:            '注册',
        SIGN_IN:            '登录',
        FORGET_PASSWORD:    '忘记密码',
        NEXT:               '下一步',
        PREV:               '上一步',

        PHONE_OR_PASSWORD_ERROR:        '手机或密码错误',



        //
        // User tab
        // ------------------------------
        MY_INFO:            '我的信息',
        MY_ME_FOLLOW:       '我关注的用户',
        MY_FOLLOW_ME:       '关注我的用户',

        PHONE:              '手机',
        PASSWORD:           '密码',
        CAPTCHA:            '验证码',
        GET_CAPTCHA:        '获取验证码',

    });
}]);
