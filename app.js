var app = getApp()

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              console.log(this.globalData.userInfo)
            }
          })
        }
      }
    })
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: that.getHeader() + '/team/getOpenid',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json'
          },
          success: res1 => {
            that.globalData.openid = res1.data.openid
            console.log("openid:" + res1.data.openid)
            this.getUidAndAuth()
          }
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    messages: [],
    openid: '',
    uid: '',
    auth: '0',
    protocal: 'http://',
    host: 'localhost',
    port: 8080,
  },

  /**
   * 封装请求头
   */
  getHeader() {
    var header = this.globalData.protocal + this.globalData.host + ':' + this.globalData.port
    return header
  },

  /**
   * 获取uid和auth
   */
  getUidAndAuth() {
    var json = this.globalData.userInfo
    json.openId = this.globalData.openid
    json.wechatName = this.globalData.userInfo.nickName
    wx.request({
      url: this.getHeader() + '/team/getUid',
      method: 'POST',
      data: json,
      contentType: 'application/json',
      success: res => {
        if (res.data != 'fail') {
          this.globalData.uid = res.data
          console.log(this.globalData.uid)
          wx.request({
            url: this.getHeader() + '/team/getUserAuth',
            method: 'GET',
            header: {
              'content-type': 'application/json;charset=UTF-8' // 默认值
            },
            data: {
              'uid': this.globalData.uid
            },
            success: res => {
              this.globalData.auth = res.data
            }
          })
        }
      }
    })
  },

})