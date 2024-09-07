// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// pages/index/index.js
Page({
  data: {
    isContentVisible: false // 初始状态为隐藏
  },

  // 切换内容显示状态
  toggleContent: function() {
    this.setData({
      isContentVisible: !this.data.isContentVisible
    });
  }
});