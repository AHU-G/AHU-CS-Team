import members from '../../utils/members.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: members,
    currentIndex: 0,
    active: 0, // 默认启用第一个标签
    abbrMemberList: members
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
    let url = this.data.memberList[this.data.currentIndex][index].iconUrl
    wx.previewImage({
      urls: [url],
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
      memberList: members,
      abbrMemberList: members
    })
    for (let i = 0; i < this.data.memberList.length; i++) {
      let temp = this.data.memberList[i]
      for (let j = 0; j < temp.length; j++) {
        temp[j].iconUrl = temp[j].iconUrl.substring(0, temp[j].iconUrl.length - 5) + '-mini'
      }
    }
    console.log(this.data.memberList)
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