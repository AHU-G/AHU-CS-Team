import members from '../../utils/members.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: members,
    managerList: [{
      'name': '杨云帆',
      'iconUrl': 'http://qcs4zgm4j.bkt.clouddn.com/image/members/yyf.png'
    }],
    coachList: [{
        'name': '王小宇',
        'iconUrl': 'http://qcs4zgm4j.bkt.clouddn.com/image/members/coach_wxy.png'
      },
      {
        'name': '徐雪健',
        'iconUrl': 'http://qcs4zgm4j.bkt.clouddn.com/image/members/coach_xxj.png'
      },
      {
        'name': '周廷恒',
        'iconUrl': 'http://qcs4zgm4j.bkt.clouddn.com/image/members/coach_zth.png'
      },
    ],
    active: 0, // 默认启用第一个标签
    index: 0,
  },

  // 预览图片
  previewImg(e) {
    console.log(e)
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