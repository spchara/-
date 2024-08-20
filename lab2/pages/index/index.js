// index.js

Page({
  data:{
    imageUrl:"",
    region:['山东省','青岛市','黄岛区'],
    regionID:"",
    updatetime : "",
    weather:{
      obsTime: "2024-08-20T08:32+08:00",
      temp: "25",
      feelsLike: "28",
      icon: "104",
      text: "阴",
      wind360: "45",
      windDir: "东北风",
      windScale: "1",
      windSpeed: "4",
      humidity: "80",
      precip: "0.0",
      pressure: "1003",
      vis: "19",
      cloud: "100",
      dew: "21"
    } ,

  },

  onLoad: function(options) {
    this.setImageUrl();
    this.fetchRegion();
  },

  setImageUrl: function() {
    const baseImgUrl = "/images/weather_icon/";
    const imgName = this.data.weather.icon + ".svg";
    const fullUrl = baseImgUrl + imgName;
    console.log(fullUrl);
    this.setData({
      imageUrl: fullUrl
    });
  },

  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    }, () => {
      console.log(this.data.region);
      this.fetchRegion();
    });
  },
  

  fetchRegion: function() {
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      data: {
        location: this.data.region[2],
        adm: this.data.region[1],
        key: "480f3b2af38e4d1dbea75b564807450c",
      },
      success: (res) => {
        console.log(res.data.location[0].id);
        if (res.statusCode === 200 && res.data.location && res.data.location.length > 0) {
          this.setData({
            regionID: res.data.location[0].id
          }, () => {
            this.fetchWeather();
          });
        }
      }
    });
  },
  

  fetchWeather: function(){
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data:{
        location:this.data.regionID,
        key:"480f3b2af38e4d1dbea75b564807450c"
      },
      success: (res) =>{
        if (res.statusCode === 200) {
          console.log(res);
          this.setData({
            weather:res.data.now
          });
          this.setImageUrl();
        }
      }
    });
    
  },
  }
)
