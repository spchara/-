// app.js

App({
  
  onLaunch() {
    // 展示本地存储能力
    wx.cloud.init({
      env: 'grabage-sorting-8gv0lmyt41caa295',  // 替换为你的云开发环境 ID
      traceUser: true  // 是否自动记录用户访问记录
    });

    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
