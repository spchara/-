// index.js


Page({
  data:{
    src:"",
    danmuText:"",
    list: [{ 
      id: '1001', 
      title: '杨国宜先生口述校史实录', 
      videoUrl: 'http://arch.ahnu.edu.cn/__local/6/CB/D1/C2DF3FC847F4CE2ABB67034C595_025F0082_ABD7AE2.mp4?e=.mp4' 
    }, 
    { 
      id: '1002', 
      title: '唐成伦先生口述校史实录', 
      videoUrl: 'http://arch.ahnu.edu.cn/__local/E/31/EB/2F368A265E6C842BB6A63EE5F97_425ABEDD_7167F22.mp4?e=.mp4' 
    }, 
    { 
      id: '1003', 
      title: '倪光明先生口述校史实录', 
      videoUrl: 'http://arch.ahnu.edu.cn/__local/9/DC/3B/35687573BA2145023FDAEBAFE67_AAD8D222_925F3FF.mp4?e=.mp4' 
    }, 
    { 
      id: '1004', 
      title: '吴仪兴先生口述校史实录', 
      videoUrl: 'http://arch.ahnu.edu.cn/__local/5/DA/BD/7A27865731CF2B096E90B522005_A29CB142_6525BCF.mp4?e=.mp4' 
    } 
    ]
  },

  onLoad:function(options){
    this.videoCtx = wx.createVideoContext('mainVideo');
  },

  playVideo: function(e) {
    if (this.videoCtx) {
      this.videoCtx.stop();
      this.setData({
        src: e.currentTarget.dataset.url
      });
      this.videoCtx.play();
    } else {
      console.error('videoCtx未正确初始化');
    }
  },

    getDanmu:function(e){
      this.setData({
        danmuText:e.detail.value
      });
    },

    sendDanmu:function(e){
      let text=this.data.danmuText;
      let randomColor = this.getRandomColor();
      this.videoCtx.sendDanmu({
        text:text,
        color: randomColor
      })
    },

  getRandomColor: function() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }
}) 
