// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
  },

  onLoad() {
    // 检查是否已登录
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo,
        hasUserInfo: true,
      });
    } else {
      this.loginAndSaveUserInfo();
    }
  },

  // 登录并保存用户信息
  loginAndSaveUserInfo() {
    const db = wx.cloud.database();
    const usersCollection = db.collection('users');

    // 使用云函数获取 openid
    wx.cloud.callFunction({
      name: 'login', // 云函数 login
      success: res => {
        const openid = res.result.openid;

        // 查询数据库中是否已有此 openid 的用户
        usersCollection.where({
          _openid: openid
        }).get({
          success: queryRes => {
            if (queryRes.data.length === 0) {
              // 如果用户不存在，生成默认用户数据
              const defaultUserInfo = {
                nickName: `user_${Math.floor(Math.random() * 10000)}`,  // 自动生成的编号
                avatarUrl: '/images/default-avatar.png',  // 默认头像
              };

              // 保存用户信息到数据库
              usersCollection.add({
                data: defaultUserInfo,
                success: addRes => {
                  console.log('用户信息已保存到数据库', addRes);
                  // 保存到本地缓存
                  wx.setStorageSync('userInfo', defaultUserInfo);
                  this.setData({
                    userInfo: defaultUserInfo,
                    hasUserInfo: true,
                  });
                },
                fail: err => {
                  console.error('保存用户信息失败', err);
                }
              });
            } else {
              console.log('用户已存在');
              wx.setStorageSync('userInfo', queryRes.data[0]);
              this.setData({
                userInfo: queryRes.data[0],
                hasUserInfo: true,
              });
            }
          },
          fail: err => {
            console.error('查询用户失败', err);
          }
        });
      },
      fail: err => {
        console.error('获取 openid 失败', err);
      }
    });
  }



}
);
