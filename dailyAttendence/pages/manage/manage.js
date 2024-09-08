// pages/manage/manage.js
const utils = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    habits:[]
  },

  go2edit:function(){
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
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
  onShow() {

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