import Dialog from '../../dist/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTimeGap: '',  // 本次训练时长
    totalTimeGap: '',  // 累计训练时长
  },

  formatTimeGap: function (millisecond) {
    var hours = parseInt((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((millisecond % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((millisecond % (1000 * 60)) / 1000);
    return hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
  },

  goToEcharts:function(e) {
    // wx.navigateTo({
    //   url: '../myPractice/myPractice',
    // })
    Dialog.alert({
      title: '提示',
      message: '该功能正在加急开发中...',
    }).then(() => {
      // on close
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timeGap = options.time
    var stuName = options.name
    this.setData({
      currentTimeGap: this.formatTimeGap(timeGap),
      stuName: stuName
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

  },

})