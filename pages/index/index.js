// index.js
const httpUtils = require('../../utils/httpUtils')
const ui = require('../../utils/ui')

Page({
  data: {
    str:null,
  },

  onLoad() {
  },

  //获取接口数据
  getNetInfo(){
    let obj = {
      method: "POST",
      showLoading: true,
      url:`/user/register?username=pppooo11&password=pppooo&repassword=pppooo`,
      message:"正在注册..."
    }
    httpUtils.request(obj).then(res=>{
      this.setData({
        str:JSON.stringify(res)
      })
      ui.showToast(res.data.errorMsg)
    }).catch(err=>{
      console.log('ERROR')
    });
  }
})
