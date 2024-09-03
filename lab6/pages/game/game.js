// pages/game/game.js
var data = require('../../utils/data.js')
var map = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]

var box=[
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]

var w = 40
var row = 0
var col = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    level: 1
  },

  initMap: function(level){
    let mapData = data.maps[level];
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        box[i][j]=0;
        map[i][j]= mapData[i][j];
  
        if(mapData[i][j] == 4){
          box[i][j]=4;
          map[i][j]=2;
        }
        else if(mapData[i][j]==5){
          map[i][j]=2;
          row = i;
          col = j;
        }
      }
    }
    console.log(map);
    console.log(box);
  },

  drawCanvas:function(){
    let ctx = this.ctx;
    ctx.clearRect(0,0,320,320);
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        let img = 'ice'
        if(map[i][j]==1){
          img='stone'
        }
        else if(map[i][j] == 3){
          img ='pig'
        }
        ctx.drawImage("/images/icons/"+img+".png", j*w,i*w,w,w);

        if(box[i][j]==4){
          ctx.drawImage("/images/icons/box.png", j*w,i*w,w,w);
        }
      }  
    }
    ctx.drawImage("/images/icons/bird.png", col*w,row*w,w,w);
    console.log("row:"+row+"col:"+col);
    ctx.draw();
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let level=options.level;
    this.setData({
      level:parseInt(level)+1
    })
    this.ctx = wx.createCanvasContext('mycanvas');
    this.initMap(level);
    this.drawCanvas();
  },

  up:function(){
    //不在最上层
    if(row>0){
      //如果上面不是墙或箱子
      
      if(map[row-1][col] != 1 && box[row - 1][col] !=4){
        //移动
        row = row -1
      }
      //如果上面是箱子
      else if(box[row - 1][col] ==4){
        //箱子可以推嘛？
        if(row-1>0){
          //如果可以
          if(map[row-2][col]!=1 && box[row-2][col]!=4){
            box[row-2][col]=4
            box[row-1][col]=0
            row = row-1
          }
        }
      }
    }
    this.drawCanvas();
    this.checkWin();
  },

  down:function(){
    console.log("row:"+row+"col:"+col);
    //不在最上层
    if(row < 7){
      //如果上面不是墙或箱子
      console.log("row:"+row+"col:"+col);
      if(map[row+1][col] != 1 && box[row + 1][col] !=4){
        //移动
        row = row +1
      }
      //如果上面是箱子
      else if(box[row + 1][col] ==4){
        //箱子可以推嘛？
        if(row+1<7){
          //如果可以
          if(map[row+2][col]!=1 && box[row+2][col]!=4){
            box[row+2][col]=4
            box[row+1][col]=0
            row = row+1
          }
        }
      }
    }
    this.drawCanvas();
    this.checkWin();
  },

  left:function(){
    //不在最上层
    if(col>0){
      //如果上面不是墙或箱子
      if(map[row][col-1] != 1 && box[row][col-1] !=4){
        //移动
        col = col -1
      }
      //如果上面是箱子
      else if(box[row][col-1] ==4){
        //箱子可以推嘛？
        if(col-1>0){
          //如果可以
          if(map[row][col-2]!=1 && box[row][col-2]!=4){
            box[row][col-2]=4
            box[row][col-1]=0
            col = col-1
          }
        }
      }
    }
    this.drawCanvas();
    this.checkWin();
  },

  right:function(){
    //不在最上层
    if(col<7){
      //如果上面不是墙或箱子
      if(map[row][col+1] != 1 && box[row][col+1] !=4){
        //移动
        col = col +1
      }
      //如果上面是箱子
      else if(box[row][col+1] ==4){
        //箱子可以推嘛？
        if(col+1<7){
          //如果可以
          if(map[row][col+2]!=1 && box[row][col+2]!=4){
            box[row][col+2]=4
            box[row][col+1]=0
            col = col+1
          }
        }
      }
    }
    this.drawCanvas();
    this.checkWin();
  },

  isWin:function(){
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        if(box[i][j] == 4 && map[i][j]!=3){
          return false;
        }
      }
    }
    return true;
  },

  checkWin:function(){
    if(this.isWin()){
      wx.showModal({
        title:"恭喜",
        content:"游戏成功！",
        showCancel:false,
      })
    }
  },

  restartGame:function(){
    this.initMap(this.data.level -1);
    this.drawCanvas();
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