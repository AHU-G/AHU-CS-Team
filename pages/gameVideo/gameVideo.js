import qqVideo from '../../utils/qqVideo.js'
import Toast from '../../dist/toast/toast.js'
var videoPage;
var pageArr = new Array()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: [
      {
        'title': '安徽大学计算机科学与技术学院女子篮球队宣传',
        'url': 'http://codersy.cn/videos/about-us.mp4',    
      },
      // {    
      //   'title': '2019年安徽大学学生篮球联赛集锦',
      //   'url': 'http://codersy.cn/videos/2019.mp4',        
      // },
      // {    
      //   'title': '2018年安徽大学学生篮球联赛集锦',
      //   'url': 'http://codersy.cn/videos/2018.mp4',        
      // },
      // {
      //   'title': '计科女篮后场双门',
      //   'url': 'http://codersy.cn/videos/back-court.mp4',    
      // },
      // {
      //   'title': '打铁记录',
      //   'url': 'http://codersy.cn/videos/shooting.MP4',    
      // }
    ],
    cardPadding: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.vid != undefined) {
      this.setData({
        file_id: options.vid
      })
    } else {
      Toast.fail('缺少视频id')
    }

    videoPage = 1;
    pageArr = new Array()
    part_urls = {}
    let that = this
    const vid = options.vid
    console.log('vid=' + vid)
    qqVideo.getVideoes(vid).then((response) => {
      for (let i = 1; i < response.length + 1; i++) {
        let indexStr = 'index' + (i)
        pageArr.push(i)
        part_urls[indexStr] = response[i - 1]
      }
      that.setData({
        videoUrl: response[0]
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
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