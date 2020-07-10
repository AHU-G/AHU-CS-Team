import specialties from '../../utils/specialties.js'
import Dialog from '../../dist/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,  // 是否显示弹窗
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
    sms: '', // 短信验证码
    tip: '发送验证码',
    timer: null,
    popupFlag: false,
  },

  onTempClose: function(e) {
    this.setData({ show: false });
    setTimeout(() => {
      wx.navigateBack({
        complete: (res) => {},
      })
    }, 1000);
    
  },

  onClickSpec(){
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
    const { picker, value, index } = e.detail;
    picker.setColumnValues(1, specialties[value[0]]);
  },
  
  chooseSpec(e) {
    this.setData({
      specialty: e.detail.value[0] +  e.detail.value[1]
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

  getSms(e) {
    this.setData({
      sms: e.detail.value
    })
  },

  sendCode() {
    let time = 60
    this.setData({
      tip: time + 's后重试',
    })
    this.timer = setInterval(() => {
      if (time === 1) {
        this.setData({
          tip: time + '发送验证码',
        })
        clearInterval(this.timer)
        this.timer = null
      } else {
        time--
        this.setData({
          tip: time + 's',
        })
      }
    }, 1000)
  },

  submit() {
    console.log(this.data.specialty)
    console.log(this.data.stu_id)
    console.log(this.data.stu_name)
    console.log(this.data.phone)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    Dialog.alert({
      title: '标题',
      message: '程序媛小改改还没有开发完毕...',
    }).then(() => {
      // on close
    })
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