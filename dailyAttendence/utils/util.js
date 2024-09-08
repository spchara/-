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

function fetchHabitByName(habitName) {
  return new Promise((resolve, reject) => {
    // 调用登录云函数获取openid
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        const openid = res.result.openid;
        const db = wx.cloud.database();

        // 使用openid和习惯名称查询习惯
        db.collection('habits').where({
          openid: openid,
          habitName: habitName
        }).get({
          success: queryRes => {
            if (queryRes.data.length > 0) {
              console.log('查询习惯成功:', queryRes.data[0]);
              resolve(queryRes.data[0]); // 返回查询到的第一个习惯对象
            } else {
              reject('没有找到对应的习惯');
            }
          },
          fail: err => {
            console.error('查询习惯失败:', err);
            reject(err);
          }
        });
      },
      fail: err => {
        console.error('调用云函数失败:', err);
        reject(err);
      }
    });
  });
}

// utils.js

/**
 * 保存或更新签到记录到数据库，确保当天不重复打卡，或更新状态为2的记录
 * @param {Object} checkInData 包含签到数据的对象
 */
function saveCheckIn(checkInData) {
  return new Promise((resolve, reject) => {
    const db = wx.cloud.database();
    const _ = db.command;

    // 构建当天日期的开始和结束时间
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));

    // 首先检查是否已经有了当天的签到记录
    db.collection('check_ins').where({
      habitId: checkInData.habitId,
      date: _.gte(todayStart).and(_.lte(todayEnd))
    }).get({
      success: res => {
        if (res.data.length > 0) {
          // 检查找到的记录中是否有状态为2的记录
          const record = res.data.find(record => record.status === "2");
          if (record) {
            // 如果找到状态为2的记录，更新这条记录的状态为1
            db.collection('check_ins').doc(record._id).update({
              data: {
                status: "1",
                date: new Date() // 更新时间为当前时间
              },
              success: updateRes => {
                console.log('已更新状态为2的记录', updateRes);
                resolve(updateRes);
              },
              fail: err => {
                console.error('更新记录失败', err);
                reject(err);
              }
            });
          } else {
            // 如果所有记录的状态都不是2，拒绝重复打卡
            reject('今天已经打过卡了，且状态不为2');
          }
        } else {
          // 没有记录，执行保存操作
          db.collection('check_ins').add({
            data: {
              recordId: checkInData.recordId,
              habitId: checkInData.habitId,
              status: checkInData.status,
              say: checkInData.say,
              date: new Date() // 使用当前时间作为打卡时间
            },
            success: addRes => {
              console.log('签到记录保存成功', addRes);
              resolve(addRes);
            },
            fail: err => {
              console.error('签到记录保存失败', err);
              reject(err);
            }
          });
        }
      },
      fail: err => {
        console.error('查询签到记录失败', err);
        reject(err);
      }
    });
  });
}



// utils.js 中的 countCheckInsByHabit 函数
function countCheckInsByHabit(habitId) {
  
  return new Promise((resolve, reject) => {
    const db = wx.cloud.database();
    console.log("查询的id",habitId);
    db.collection('check_ins').where({
      habitId: habitId,
      status: "1"  // 假设status为1表示有效签到
    }).count({
      success: res => {
        console.log('签到次数查询成功', res);
        if (res.total === 0) {
          console.log('查询成功，但没有找到符合条件的记录');
        }
        resolve(res.total);
      },
      fail: err => {
        console.error('签到次数查询失败', err);
        reject(err);
      }
    });
  });
}



module.exports = {
  formatTime,
  fetchUserHabits,
  fetchHabitByName,
  saveCheckIn,
  countCheckInsByHabit
}
