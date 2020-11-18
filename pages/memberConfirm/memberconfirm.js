import specialties from '../../utils/specialties.js'
import Dialog from '../../dist/dialog/dialog';
import Notify from '../../dist/notify/notify';
import Toast from '../../dist/toast/toast';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true, // 是否显示弹窗
    columns: [{
        values: Object.keys(specialties),
        className: 'column1',
      },
      {
        values: specialties['研究生'],
        className: 'column2',
        defaultIndex: 0,
      }
    ],
    specialty: '', // 专业
    stu_name: '',
    stu_id: '',
    phone: '',
    identity: ['队员', '经理', '教练'], // 身份
    radio: '',
    popupFlag: false,
  },

  onRadioChange: function (e) {
    this.setData({
      radio: e.detail
    })
  },

  onClickRadio: function (e) {
    const {
      name
    } = e.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },

  onTempClose: function (e) {
    this.setData({
      show: false
    });
    setTimeout(() => {
      wx.navigateBack({
        complete: (res) => {},
      })
    }, 1000);

  },

  onClickSpec() {
    this.setData({
      popupFlag: true
    })
  },

  onClose() {
    this.setData({
      popupFlag: false
    })
  },

  // picker动态数据联动
  onChange: e => {
    const {
      picker,
      value,
      index
    } = e.detail;
    picker.setColumnValues(1, specialties[value[0]]);
  },

  chooseSpec(e) {
    this.setData({
      specialty: e.detail.value[0] + e.detail.value[1]
    })
    this.onClose()
  },

  getStuId(e) {
    this.setData({
      stu_id: e.detail.value
    })
  },

  getStuName(e) {
    this.setData({
      stu_name: e.detail.value
    })
  },

  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  submit() {
    var major = this.data.specialty
    var stuId = this.data.stu_id
    var stuName = this.data.stu_name
    var phone = this.data.phone
    var identity = this.data.radio
    if (major == '' || stuId == '' || stuName == '' || phone == '' || identity != '0' && identity != '1' && identity != '2') {
      Dialog.alert({
        title: '提示',
        message: '请完成认证全部内容再提交~',
      }).then(() => {
        // on close
      });
    } else {
      var json = {}
      json.uid = app.globalData.uid
      json.stuName = stuName
      json.stuId = stuId
      json.major = major
      json.phoneNumber = phone
      json.category = identity
      console.log(json)
      
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 1500
      });

      wx.request({
        url: app.getHeader() + '/team/confirmMember',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(json),
        success: res => {
          console.log(res)
          if (res.data == 'success') {
            Notify({ type: 'success', message: '认证成功~' });
            setTimeout(() => {
              wx.navigateBack({
                complete: (res) => {},
              })
            }, 1200);
          } else {
            Notify({ type: 'danger', message: '认证失败~请稍后再试' });
          }
        }
      })
    }
  },

  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.auth == '1') {
      Dialog.alert({
        title: '提示',
        message: '请勿重复认证',
      }).then(() => {
        // on close
        wx.navigateBack({
          complete: (res) => {},
        })
      });
    }
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