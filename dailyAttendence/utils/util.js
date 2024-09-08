const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// utils.js

function fetchUserHabits() {
  return new Promise((resolve, reject) => {
    // 调用云函数获取 openid
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        const openid = res.result.openid;
        console.log('获取到的openid:', openid);

        const db = wx.cloud.database();
        // 使用获取到的openid查询该用户的所有习惯
        db.collection('habits').where({
          openid: openid
        }).get({
          success: queryRes => {
            console.log('查询习惯成功:', queryRes.data);
            
            resolve(queryRes.data); 
          },
          fail: err => {
            console.error('查询习惯失败:', err);
            reject(err); // 返回查询失败原因
          }
        });
      },
      fail: err => {
        console.error('调用云函数失败:', err);
        reject(err); // 返回云函数调用失败原因
      }
    });
  });
}



module.exports = {
  formatTime,
  fetchUserHabits
}
