import photo from '../../utils/photos.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,  // 默认启用第一个标签
    currentIndex: 0,
    imgUrls: photo,
  },
  
  onChange(e) {
    let i = e.detail.name
    let that = this
    that.setData({
      currentIndex: i
    })
  },

  previewImg(e) {
    let index = e.currentTarget.dataset.index
    let url = this.data.imgUrls[this.data.currentIndex][index]
      wx.previewImage({
        urls: this.data.imgUrls[this.data.currentIndex],
        current: url,
        success: res => {

        }
      })
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
    this.setData({
      imgUrls: photo
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
