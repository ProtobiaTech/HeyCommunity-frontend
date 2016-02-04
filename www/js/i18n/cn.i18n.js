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

        SUBMIT:             '提交',
        CREATE:             '创建',
        PUBLISH:            '发布',
        EDIT:               '编辑',
        UPDATE:             '更新',
        DELETE:             '删除',
        DESTROY:            '销毁',

        PHONE_OR_PASSWORD_ERROR:        '手机或密码错误',

        // Form
        AVATAR:             '头像',
        TITLE:              '标题',
        CONTENT:            '内容',
        START_DATE:         '开始时间',
        END_DATE:           '结束时间',




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



        //
        // Activity tab
        // ------------------------------
        ACTIVITY:               '活动',
        CREATE_ACTIVITY:        '创建活动',
        COMMENT:                '评论',
        ATTEND:                 '报名',

    });
}]);
