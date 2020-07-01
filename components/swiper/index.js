Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange(e) {
      this.setData({
        currentIndex: e.detail.current
      });
    },
    clickImg(e) {
      let url = this.properties.imgUrls[this.data.currentIndex]
      wx.previewImage({
        urls: this.properties.imgUrls,
        current: url,
        success: res => {

        }
      })
    }
  }
});