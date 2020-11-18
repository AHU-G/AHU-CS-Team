import qqVideo from '../../utils/qqVideo.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl: '',
    vid: 'e3139uzwyfr',
    groupNumber: '1147547401',
  },

  onCopyGroupNumber: function () {
    wx.setClipboardData({
      data: this.data.groupNumber
    });
  },

  getVideoInfo: function (vid) {
    var that = this;
    var urlString = 'https://vv.video.qq.com/getinfo?otype=json&appver=3.2.19.333&platform=11&defnpayver=1&vid=' + vid;
    wx.request({
      url: urlString,
      success: function (res) {
        var dataJson = res.data.replace(/QZOutputJson=/, '') + "qwe";
        var dataJson1 = dataJson.replace(/;qwe/, '');
        var data = JSON.parse(dataJson1);
        var fn_pre = data.vl.vi[0].lnk
        host = data['vl']['vi'][0]['ul']['ui'][0]['url']
        var streams = data['fl']['fi']
        var seg_cnt = data['vl']['vi'][0]['cl']['fc']
        if (parseInt(seg_cnt) == 0) {
          seg_cnt = 1
        }
        var best_quality = streams[streams.length - 1]['name']
        var part_format_id = streams[streams.length - 1]['id']

        for (var i = 1; i < (seg_cnt + 1); i++) {
          var filename = fn_pre + '.p' + (part_format_id % 10000) + '.' + i + '.mp4';
          console.log(filename);
          pageArr.push(i);
          that.requestVideoUrls(part_format_id, vid, filename, 'index' + i);

        }

      }
    })
  },

  requestVideoUrls: function (part_format_id, vid, fileName, index) {
    var keyApi = "https://vv.video.qq.com/getkey?otype=json&platform=11&format=" + part_format_id + "&vid=" + vid + "&filename=" + fileName + "&appver=3.2.19.333"
    var that = this;
    wx.request({
      url: keyApi,
      success: function (res) {
        var dataJson = res.data.replace(/QZOutputJson=/, '') + "qwe";
        var dataJson1 = dataJson.replace(/;qwe/, '');
        var data = JSON.parse(dataJson1);
        if (data.key != undefined) {
          var vkey = data['key']
          var url = host + fileName + '?vkey=' + vkey;
          part_urls[index] = String(url)
          that.setData({
            videoUrl: part_urls.index1
          });
        }
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
    this.getVideoInfo(this.data.vid)
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