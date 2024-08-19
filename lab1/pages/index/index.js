// index.js

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: { 
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '微信昵称',
    }
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
    })
  },
  
  getAvatarAndName(e) {
    wx.getUserProfile({
      desc: '获取头像与昵称',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
        })
      }
    })
  },
})
