HeyCommunity

.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('zh-cn', {
        //
        // Common
        // ------------------------------
        SETUP:              '设置',
        PLEASE_SIGN_IN:     '请登录',
        SIGN_UP:            '注册',
        SIGN_IN:            '登录',
        USER_CENTER:        '用户中心',

        LANGUAGE:           '语言',
        PLEASE_SIGN_IN:     '请先登录',
        ERROR:              '错误',
        REPORT:             '报告',

        FORGET_PASSWORD:    '忘记密码',
        NEXT:               '下一步',
        PREV:               '上一步',
        SUBMIT:             '提交',
        CREATE:             '创建',
        PUBLISH:            '发布',
        EDIT:               '编辑',
        UPDATE:             '更新',
        DELETE:             '删除',
        DESTROY:            '删除',
        DESTROY_ALL:        '删除全部',
        MARK_CHECKED_ALL:   '全部标为已读',
        MARK_CHECKED:       '标为已读',
        SELECT:             '选择',
        READED:             '已读',

        DETAIL:             '详情',
        COMMENTS:           '评论',

        PHONE_OR_PASSWORD_ERROR:        '手机或密码错误',
        PULL_TO_REFRESH:                '下拉刷新 ...',
        PLEASE_LOGIN_FIRST:             '请先登录',
        ARE_YOU_SURE_DESTROY_IT:        '你确定要删除?',
        MANAGEMENT_OPERATIONS:          '管理操作',
        CANCEL:                         '取消',
        COMING_SOON:                    '敬请期待',
        POSTED_ON:                      '发布于',

        // Form
        AVATAR:             '头像',
        TITLE:              '标题',
        CONTENT:            '内容',
        START_DATE:         '开始时间',
        END_DATE:           '结束时间',

        ALERT:              '注意',
        ERROR:              '错误',
        SUCCESS:            '成功',
        FAIL:               '失败',



        //
        // User tab
        // ------------------------------
        MY_INFO:            '我的信息',
        MY_HOME:            '我的主页',
        MY_ME_FOLLOW:       '我关注的用户',
        MY_FOLLOW_ME:       '关注我的用户',

        PHONE:              '手机',
        PASSWORD:           '密码',
        CAPTCHA:            '验证码',
        GET_CAPTCHA:        '获取验证码',
        EMAIL:              '邮箱',
        NICKNAME:           '昵称',

        SELECT_NEW_AVATAR:      '选择新头像',

        SETUP_GENERAL_LANGUAGE:         '语言设置',
        SETUP_GENERAL:                  '通用设置',
        WELCOME_COME_TO:                '欢迎来到',
        WELCOME_COME_BACK:              '欢迎回到',



        //
        // Activity tab
        // ------------------------------
        ACTIVITY:               '活动',
        CREATE_ACTIVITY:        '创建活动',
        COMMENT:                '评论',
        ATTEND:                 '报名',
        INITIATING_AN_ACTIVITY: '暂无活动，你来发起一个活动吧',



        //
        // Timeline Tab
        // -------------------------------
        TIMELINE:               '时间线',
        CREATE_TIMELINE:        '分享新鲜事',
        WHAT_IS_NEW:            '有什么新鲜事儿',
        PICTURE:                '图片',
        NEW_PHOTO:              '照片',
        NEW_VIDEO:              '小视频',
        LIKE_OR_COMMENT:        '等 {{ num }} 个用户喜欢或评论',



        //
        // Set UP Tab
        // --------------------------------
        GENERAL:                '通用',
        ACCOUNT_SECURITY:       '账号与安全',
        PRIVACY:                '隐私',
        FEEDBACK:               '建议反馈',
        SOFT_INFO:              '软件信息',
        SIGN_OFF:               '退出登录',



        //
        // Topic Tab
        // --------------------------------
        TOPIC:                  '话题',
        CREATE_TOPIC:           '新话题',
        SAY_SOMETHING:          '说点什么',



        //
        // Talk Tab
        // --------------------------------
        TALK:                  '聊天',



        //
        // Notice
        // --------------------------------
        NOTICE:                 '通知',
        COMMENT_YOUR:           '评论你的',
        LIKE_YOUR:              '喜欢你的',
    });
}]);
