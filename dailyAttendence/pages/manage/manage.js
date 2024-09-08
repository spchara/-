// pages/manage/manage.js
const utils = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    habits:[]
  },

  initPunchCount: function() {
    // 使用Promise.all处理所有习惯的签到次数查询
    const promises = this.data.habits.map(habit => {
      return utils.countCheckInsByHabit(habit._id)  // 从数据库获取每个习惯的签到次数
        .then(count => {
          habit.punchCount = count;  // 设置签到次数
          return habit;  // 返回更新后的习惯对象
        })
        .catch(err => {
          console.error('获取签到次数失败:', err);
          habit.punchCount = 0;  // 如果查询失败，默认设置为0
          return habit;
        });
    });

    Promise.all(promises).then(newHabits => {
      this.setData({
        habits: newHabits  // 更新所有习惯的数据
      });
      console.log("新的数据",this.data.habits)
    });
  },

  go2edit:function(){
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
  },

  navigateWithName: function(event) {
    
    const param = event.currentTarget.dataset.name;
    console.log(param);
    wx.navigateTo({
      url: '/pages/edit/edit?name='+param
    });
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    utils.fetchUserHabits().then(habits => {
      console.log('用户习惯列表:', habits);
      this.setData({
        habits: habits
      });
      this.initPunchCount();
    }).catch(error => {
      console.error('获取习惯列表失败:', error);
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 每次页面显示时执行的代码
    this.onLoad();  // 重新加载或更新数据
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})