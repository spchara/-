// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const utils = require('../../utils/util.js');
// pages/index/index.js
Page({
  data: {
    isContentVisible: false,
    activeName: '1',
    habits:[],
    attendence:false,
    punchInHabit:{},
    status:"2",
    say:""
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

  onCheckIn: function() {
    const checkInData = {
      habitId: this.data.punchInHabit._id,
      status: this.data.status,
      say: this.data.say,
      date: new Date()
    };

    utils.saveCheckIn(checkInData).then(res => {
      wx.showToast({
        title: '签到成功',
        icon: 'success'
      });
    }).catch(err => {
      wx.showToast({
        title: '签到失败',
        icon: 'none'
      });
      console.error('签到失败:', err);
    });
  },

  saySomething(e){
    this.setData({
      say: e.detail.value
    });
  },

  onChange(e) {
    this.setData({
      status: e.detail
    });
  },

  showDialog:function(event) {
    const name=event.currentTarget.dataset.name;
    console.log(name);
    utils.fetchHabitByName(name).then(habit => {
      console.log('根据名字获取到的习惯:', habit);
      this.setData({
        punchInHabit: habit,
        attendence: true
      });
    }).catch(error => {
      console.error('获取习惯失败:', error);
      wx.showToast({
        title: '习惯未找到',
        icon: 'none'
      });
    });
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
      this.initPunchCount();
    }).catch(error => {
      console.error('获取习惯列表失败:', error);
    });
    
  },

  onShow: function() {
    // 每次页面显示时执行的代码
    this.onLoad();  // 重新加载或更新数据
  },

});