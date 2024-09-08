// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

exports.main = async (event, context) => {
  const db = cloud.database();
  const { OPENID } = cloud.getWXContext();
  const { nickName, avatarUrl } = event;

  try {
    return await db.collection('users').where({
      openid: OPENID
    }).update({
      data: {
        nickName: nickName,
        avatarUrl: avatarUrl
      }
    });
  } catch (e) {
    return e;
  }
}