const ui = require('./ui');
const BASE_URL = 'https://www.wanandroid.com'


/**
 * 网络请求request
 * obj.data 请求接口需要传递的数据
 * obj.showLoading 控制是否显示加载Loading 默认为false不显示
 * obj.contentType 默认为 application/json
 * obj.method 请求的方法  默认为GET
 * obj.url 请求的接口路径 
 * obj.message 加载数据提示语
 */
function request(obj) {
    return new Promise(function(resolve, reject) {
      if(obj.showLoading){
        ui.showLoading(obj.message? obj.message : '加载中...');
      }
      var data = {};
      if(obj.data) {
        data = obj.data;
      }
      var contentType = 'application/json';
      if(obj.contentType){
        contentType = obj.contentType;
      } 
  
      var method = 'GET';
      if(obj.method){
        method = obj.method;
      }
  
      wx.request({
        url: BASE_URL + obj.url,
        data: data,
        method: method,
        //添加请求头
        header: {
          'Content-Type': contentType ,
          'token': wx.getStorageSync('token') //获取保存的token
        },
        //请求成功
        success: function(res) {
          console.log('===============================================================================================')
          console.log('==    接口地址：' + obj.url);
          console.log('==    接口参数：' + JSON.stringify(data));
          console.log('==    请求类型：' + method);
          console.log("==    接口状态：" + res.statusCode);
          console.log("==    接口数据：" + JSON.stringify(res.data));
          console.log('===============================================================================================')
          if (res.statusCode == 200) {
            resolve(res);
          } else if (res.statusCode == 401) {//授权失效
            reject("登录已过期");
            jumpToLogin();//跳转到登录页
          } else {
            //请求失败
            reject("请求失败：" + res.statusCode)
          }
        },
        fail: function(err) {
          //服务器连接异常
          console.log('===============================================================================================')
          console.log('==    接口地址：' + url)
          console.log('==    接口参数：' + JSON.stringify(data))
          console.log('==    请求类型：' + method)
          console.log("==    服务器连接异常")
          console.log('===============================================================================================')
          reject("服务器连接异常，请检查网络再试");
        },
        complete: function() {
          ui.hideLoading();
        }
      })
    });
  }
  

  //跳转到登录页
  function jumpToLogin(){
    wx.reLaunch({
      url: '/pages/login/login',
    })
  }
  
  module.exports = {
    request,
  }
  