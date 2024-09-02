// pages/index/index.js
var common = require('../../utils/common.js') //引用公共JS文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //幻灯片素材
    swiperImg: [
      {src: 'https://news.ouc.edu.cn/_upload/article/images/12/8b/de7f4963476da934b54aebfb8f97/36529309-d65e-48cb-ba3f-016cac9f4d19.jpg'},
      {src: 'https://news.ouc.edu.cn/_upload/article/images/59/30/d19095614e568f55a5f692311218/bad85368-4b34-4c47-a9e4-737e543d3bf5.jpg'},
      {src: 'https://news.ouc.edu.cn/_upload/article/images/73/48/f5ef2ba040c384d2a2b76c840ba2/27a4e591-9e1b-49e9-90c7-b8326690e2fd.jpg'}
    ],
    newsList:[]
  },

  /**
   * 自定义函数--跳转新页面浏览新闻内容
   */
  goToDetail: function(e) {
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻id进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取新闻列表
    let list = common.getNewsList()
    //更新列表数据
    this.setData({
      newsList: list
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})