import Dialog from '../../dist/dialog/dialog'
import Toast from '../../dist/toast/toast';
import Notify from '../../dist/notify/notify'
const app = getApp()
var util = require('../../utils/util.js')
var canCheck = true
var start, end, startFormat, endFormat, pid

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 签到信息
    position: '',
    stuName: '',
    checkInStatus: false,
    checkOutStatus: false,
    startTime: '',
    endTime: '',
    pracTime: '',
    iconName: 'play-circle-o',
  },

  onGetName(e) {
    console.log(e.detail.value)
    this.setData({
      stuName: e.detail.value
    })
  },

  /**
   * 获取地理位置信息
   * @param {} e 
   */
  onGetLoc: function (e) {
    // 北体篮球场：31.771233954, 117.185112674
    // 梅园：31.765727809, 117.181381405
    // 桔园2号楼：31.768630763, 117.181135681
    // 桂园：31.762746698, 117.184587349
    // 榴园：31.770292899, 117.18284045
    var latitude, longitude
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        latitude = res.latitude
        longitude = res.longitude
        console.log(res)
        // 计算与北体篮球场的距离
        var dis = this.getDistance(latitude, longitude, 31.771233954, 117.185112674)
        if (dis <= 0.004) {
          console.log('处于北体区')
          that.setData({
            position: '北体育场-篮球场'
          })
        } else {
          var dis1 = this.getDistance(latitude, longitude, 31.765727809, 117.181381405)
          var dis2 = this.getDistance(latitude, longitude, 31.768630763, 117.181135681)
          var dis3 = this.getDistance(latitude, longitude, 31.762746698, 117.184587349)
          var dis4 = this.getDistance(latitude, longitude, 31.770292899, 117.18284045)
          if (dis1 <= 0.006 || dis2 <= 0.006 || dis3 <= 0.006 || dis4 <= 0.006) {
            console.log('处于生活区')
            that.setData({
              position: '生活区'
            })
          } else {
            console.log('处于未知区域')
            that.setData({
              position: '未知区域'
            })
          }
        }
      }
    })

    // wx.chooseLocation({
    //   success: res => {
    //     console.log(res)
    //   }
    // })
  },

  /**
   * 图标解释信息
   * @param {*} e 
   */
  onClickQues: function (e) {
    Dialog.alert({
      title: '提示',
      message: '姓名及位置信息将用于在后台准确记录签到信息，如有疑问请移步至首页-常见问题模块查看'
    }).then(() => {
      // on close
    })
  },

  onClickIcon: function (e) {
    if (this.data.stuName == '' || this.data.position == '') {
      Dialog.alert({
        title: '提示',
        message: '请完成签到信息录入!',
      }).then(() => {
        // on close
      })
    }
    // else if (this.data.position == '生活区') {
    //   Dialog.alert({
    //     title: '提示',
    //     message: '生活区域无法打卡!',
    //   }).then(() => {
    //     // on close
    //   })
    // } else if (this.data.position == '未知区域') {
    //   Dialog.alert({
    //     title: '提示',
    //     message: '未知区域无法打卡!',
    //   }).then(() => {
    //     // on close
    //   })
    // }
    else if (pid == '') {
      Dialog.alert({
        title: '提示',
        message: '暂未获取训练数据，请稍后再试!',
      }).then(() => {
        // on close
      })
    }
    else {
      // 签到
      if (this.data.iconName == 'play-circle-o' && canCheck) {
        wx.setStorageSync('stuName', this.data.stuName)
        wx.setStorageSync('position', this.data.position)
        start = new Date()
        startFormat = util.formatTime(start)
        wx.setStorageSync('startTime', startFormat)
        // 不可重复点击，5s后才会恢复点击态
        canCheck = false
        setTimeout(() => { canCheck = true }, 5000)
        this.setData({
          startTime: startFormat,
          endTime: '',
          pracTime: '',
          iconName: 'stop-circle-o'
        })
        Toast.success('签到成功')
      } else if (this.data.iconName == 'stop-circle-o' && canCheck) {
        // 签退
        end = new Date()
        endFormat = util.formatTime(end)
        var timeGap = end - start
        console.log('训练时长', timeGap)
        // 清空缓存
        wx.setStorageSync('startTime', '')
        // 超过4小时自动签退
        if (timeGap >= 14400000) {
          timeGap = 14400000
        }
        app.globalData.wholeTime = timeGap
        var timeGapFormat = this.formatTimeGap(timeGap)
        console.log('训练时长', timeGap)
        // 不可重复点击，5s后才会恢复点击态
        canCheck = false
        setTimeout(() => { canCheck = true }, 5000)
        this.setData({
          iconName: 'play-circle-o',
          endTime: endFormat,
          pracTime: timeGapFormat
        })
        var json = {
          pid: pid,
          stuName: this.data.stuName,
          startTime: startFormat,
          endTime: endFormat
        }
        wx.request({
          url: app.getHeader() + '/team/insertAttendance',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(json),
          success: res => {
            if (res.data == 'success') {
              Toast.success('签退成功')
              setTimeout(() => {
                wx.navigateTo({
                  url: '../finish/finish?time=' + timeGap + '&name=' + this.data.stuName,
                })
              }, 2500)
            } else {
              Toast.success('签退失败')
            }
          }
        })

      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('globalData.auth=', app.globalData.auth)
    if (app.globalData.auth == '0') {
      Dialog.alert({
        title: '提示',
        message: '请先进行队员认证',
      }).then(() => {
        // on close
        wx.navigateBack({
          complete: (res) => { },
        })
      });
    }

    // 拉取本次训练id
    wx.request({
      url: app.getHeader() + '/team/findLatestPracticeId',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.data != 'fail') {
          pid = res.data
          console.log('本次训练id:', res.data)
        } else {
          Toast.fail('拉取数据失败，请稍后再试')
        }
      }
    })

    var s = wx.getStorageSync('stuName')
    if (s != '') {
      this.setData({
        stuName: s
      })
    }

    var timeStore = wx.getStorageSync('startTime')
    if (timeStore != '') {
      this.setData({
        startTime: timeStore,
        iconName: 'stop-circle-o',
        stuName: wx.getStorageSync('stuName'),
        position: wx.getStorageSync('position')
      })
    }
    // 设置默认时间
    // var time = util.formatTime(new Date())
    // console.log('time=' + time)
    // this.setData({
    //   startTime: time,
    //   endTime: time
    // })
  },


  /**
   * 计算距离
   */
  getDistance: function (x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  },

  formatTimeGap: function (millisecond) {
    var hours = parseInt((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((millisecond % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((millisecond % (1000 * 60)) / 1000);
    return hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
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
    var timeStore = wx.getStorageSync('startTime')
    if (timeStore != '') {
      this.setData({
        startTime: timeStore,
        iconName: 'stop-circle-o',
        stuName: wx.getStorageSync('stuName'),
        position: wx.getStorageSync('position')
      })
    }
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