import Dialog from '../../dist/dialog/dialog'
var QQMapWx = require('../../utils/qqmap-wx-jssdk.js')
var qqmapsdk
const app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 签到信息
    position: '',
    stuname: '',
    checkInStatus: false,
    checkOutStatus: false,
    startTime: '',
    endTime: '',
    btnVal: '签到'
  },

  onGetName(e) {
    console.log(e.detail.value)
    this.setData({
      stuname: e.detail.value
    })
  },

  onGetPos(e) {
    console.log(e.detail.value)
    this.setData({
      position: e.detail.value
    })
  },

  /**
   * 获取地理位置信息
   * @param {} e 
   */
  onGetLoc: function(e) {
    let that = this
    wx.getLocation({
      success: res => {
        console.log(res)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res1) {
            console.log(res1.result);
            that.setData({
              position: res1.result.address
            })
          },
          fail: function (res2) {
            console.log(res2);
          }
        })
      }
    })
  },

  /**
   * 图标解释信息
   * @param {*} e 
   */
  onClickIcon: function(e) {
    Dialog.alert({
      title: '提示',
      message: '姓名及位置信息将用于在后台准确记录签到信息，如有疑问请移步至首页-常见问题模块查看'
    }).then(() => {
      // on close
    })
  },

  /**
   * 签到
   * @param {*} e 
   */
  checkIn: function(e) {

  },

  /**
   * 签退
   * @param {*} e 
   */
  checkOut: function(e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWx({
      key: 'PQYBZ-MYYLV-WDHPG-UUENR-7F6MZ-G7FTG'
    })
    if (app.globalData.auth == '0') {
      Dialog.alert({
        title: '提示',
        message: '请先进行队员认证',
      }).then(() => {
        // on close
        wx.navigateBack({
          complete: (res) => {},
        })
      });
    }
    var time = util.formatTime(new Date())
    console.log('time=' + time)
    this.setData({
      startTime: time,
      endTime: time
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})