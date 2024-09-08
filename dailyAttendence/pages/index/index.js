// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const utils = require('../../utils/util.js');
// pages/index/index.js
Page({
  data: {
    isContentVisible: false,
    activeName: '1',
    habits:[]
  },

  // 切换内容显示状态
  toggleContent: function() {
    this.setData({
      isContentVisible: !this.data.isContentVisible
    });
  },

  changetime(event) {
    this.setData({
      activeName: event.detail,
    });
  },

  onLoad(options) {
    utils.fetchUserHabits().then(habits => {
      console.log('用户习惯列表:', habits);
      this.setData({
        habits: habits
      });
    }).catch(error => {
      console.error('获取习惯列表失败:', error);
    });
  },

  navigateWithName: function(event) {
    const param = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/target/target?param1=value1&param2=value2'
    });
    
  }

});