const db = wx.cloud.database();

function saveHabit(habitData) {
  db.collection('habits').add({
    data: {
      openid: habitData.openid,          // 用户的openid
      habitName: habitData.habitName,    // 习惯名称
      chooseHabit: habitData.chooseHabit,// 习惯类型标识
      chooseColor: habitData.chooseColor,// 习惯颜色标识
      backgroundColor: habitData.backgroundColor, // 背景颜色
      chooseFreq: habitData.chooseFreq,  // 打卡频率数组
      motivation: habitData.motivation   // 动机描述
    },
    success: res => {
      console.log('习惯保存成功', res);
      wx.showToast({
        title: '习惯保存成功',
        icon: 'success',
        duration: 2000
      });
    },
    fail: err => {
      console.error('习惯保存失败', err);
      wx.showToast({
        title: '习惯保存失败',
        icon: 'none',
        duration: 2000
      });
    }
  });
}



Page({
  data: {
    habitdata:[],
    habitName: '',  // 习惯名称
    chooseHabit: '1',
    chooseColor:'#990f0f',
    backgroundColor: '',
    chooseFreq:[],
    motivation: '', 
    colors1:[{hex: "#990f0f"}, {hex: "#99180f"}, {hex: "#99210f"}, {hex: "#992a0f"}, {hex: "#99340f"}, {hex: "#993d0f"}, {hex: "#99460f"}, {hex: "#994f0f"}, {hex: "#99580f"}, {hex: "#99610f"}, {hex: "#996b0f"}, {hex: "#99740f"}, {hex: "#997d0f"}, {hex: "#99860f"}, {hex: "#998f0f"}, {hex: "#99990f"}, {hex: "#8f990f"}, {hex: "#86990f"}, {hex: "#7d990f"}, {hex: "#74990f"}, {hex: "#6b990f"}, {hex: "#61990f"}, {hex: "#58990f"}, {hex: "#4f990f"}, {hex: "#46990f"}, {hex: "#3d990f"}, {hex: "#34990f"}, {hex: "#2a990f"}, {hex: "#21990f"}, {hex: "#18990f"}],
    colors2:[{hex: "#0f990f"}, {hex: "#0f9918"}, {hex: "#0f9921"}, {hex: "#0f992a"}, {hex: "#0f9934"}, {hex: "#0f993d"}, {hex: "#0f9946"}, {hex: "#0f994f"}, {hex: "#0f9958"}, {hex: "#0f9961"}, {hex: "#0f996b"}, {hex: "#0f9974"}, {hex: "#0f997d"}, {hex: "#0f9986"}, {hex: "#0f998f"}, {hex: "#0f9999"}, {hex: "#0f8f99"}, {hex: "#0f8699"}, {hex: "#0f7d99"}, {hex: "#0f7499"}, {hex: "#0f6b99"}, {hex: "#0f6199"}, {hex: "#0f5899"}, {hex: "#0f4f99"}, {hex: "#0f4699"}, {hex: "#0f3d99"}, {hex: "#0f3499"}, {hex: "#0f2a99"}, {hex: "#0f2199"}, {hex: "#0f1899"}],
    colors3:[{hex: "#0f0f99"}, {hex: "#180f99"}, {hex: "#210f99"}, {hex: "#2a0f99"}, {hex: "#340f99"}, {hex: "#3d0f99"}, {hex: "#460f99"}, {hex: "#4f0f99"}, {hex: "#580f99"}, {hex: "#610f99"}, {hex: "#6b0f99"}, {hex: "#740f99"}, {hex: "#7d0f99"}, {hex: "#860f99"}, {hex: "#8f0f99"}, {hex: "#990f99"}, {hex: "#990f8f"}, {hex: "#990f86"}, {hex: "#990f7d"}, {hex: "#990f74"}, {hex: "#990f6b"}, {hex: "#990f61"}, {hex: "#990f58"}, {hex: "#990f4f"}, {hex: "#990f46"}, {hex: "#990f3d"}, {hex: "#990f34"}, {hex: "#990f2a"}, {hex: "#990f21"}, {hex: "#990f18"}],

    days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],  // 可选的打卡天数
    selectedDays: [],  // 选择的天数
    times: ['任意时间', '起床', '晨间', '中午', '午间', '晚间', '睡前'],  // 打卡时间
    selectedTime: '',  // 选择的打卡时间


  },

  hexToRgba:function (hex, opacity) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },

  onLoad: function() {
    this.setData({
      backgroundColor:this.hexToRgba(this.data.chooseColor,0.5)
    })
  },
  // 输入习惯名称
  onNameInput(e) {
    console.log(e.detail);
    this.setData({
      habitName: e.detail
    });
  },

  iconChange(e){
    this.setData({
      chooseHabit: e.detail
    });
    console.log(this.data.chooseHabit);
  },



  changeColor: function(e) {
    this.setData({
      chooseColor: e.detail
    }, () => {
      this.setData({
        backgroundColor: this.hexToRgba(this.data.chooseColor, 0.5)
      });
    });
    console.log("Selected color HEX:", this.data.chooseColor);
},

  changeFreq: function(event) {
    this.setData({
      chooseFreq: event.detail,
    });
    console.log(this.data.chooseFreq);
  },

  // 选择打卡天数
  selectDay(e) {
    const day = e.currentTarget.dataset.day;
    let selectedDays = this.data.selectedDays;
    const index = selectedDays.indexOf(day);
    if (index > -1) {
      selectedDays.splice(index, 1);  // 取消选择
    } else {
      selectedDays.push(day);  // 添加选择
    }
    this.setData({
      selectedDays: selectedDays
    });
  },

  // 选择打卡时间
  selectTime(e) {
    this.setData({
      selectedTime: e.currentTarget.dataset.time
    });
  },

  // 输入激励话语
  onMotivationInput(e) {
    this.setData({
      motivation: e.detail.value
    });
  },

  // 取消操作
  cancel() {
    wx.navigateBack();
  },

  // 保存操作
  // 保存操作
save() {
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      const openid = res.result.openid;
      console.log('获取到的openid:', openid);
      // 准备需要保存的数据
      const habitData = {
        openid: openid,  // 设置获取到的openid
        habitName: this.data.habitName,
        chooseHabit: this.data.chooseHabit,
        chooseColor: this.data.chooseColor,
        backgroundColor: this.data.backgroundColor,
        chooseFreq: this.data.chooseFreq,
        motivation: this.data.motivation
      };

      const db = wx.cloud.database();
      // 先查询该习惯是否已存在
      db.collection('habits').where({
        openid: habitData.openid,
        habitName: habitData.habitName // 使用习惯名称和openid作为唯一标识
      }).get({
        success: queryRes => {
          if (queryRes.data.length > 0) {
            // 习惯已存在，更新记录
            const habitId = queryRes.data[0]._id; // 获取已存在记录的_id
            db.collection('habits').doc(habitId).update({
              data: habitData,
              success: updateRes => {
                console.log('习惯更新成功', updateRes);
                wx.showToast({
                  title: '习惯更新成功',
                  icon: 'success',
                  duration: 2000
                });
                wx.navigateBack();
              },
              fail: err => {
                console.error('习惯更新失败', err);
                wx.showToast({
                  title: '习惯更新失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            });
          } else {
            // 习惯不存在，添加新记录
            db.collection('habits').add({
              data: habitData,
              success: addRes => {
                console.log('习惯添加成功', addRes);
                wx.showToast({
                  title: '习惯添加成功',
                  icon: 'success',
                  duration: 2000
                });
                wx.navigateBack();
              },
              fail: err => {
                console.error('习惯添加失败', err);
                wx.showToast({
                  title: '习惯添加失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            });
          }
        },
        fail: err => {
          console.error('查询习惯失败', err);
        }
      });
    },
    fail: err => {
      console.error('调用云函数失败：', err);
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none',
        duration: 2000
      });
    }
  });
}

});
