Page({
    data: {
        activeTab: 0,
        refresh: ''
    },

    onReady() {
        wx.setNavigationBarTitle({
            title: '店主管理'
        })
    },

    switchTab(e) {
        this.setData({
            activeTab: e.detail.index
        });
    },

    onPullDownRefresh: function () {
        console.log('manage 下拉');
        this.setData({
            refresh: Date.now()
        })
    },
});
