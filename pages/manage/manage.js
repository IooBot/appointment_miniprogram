Page({
    data: {
        activeTab: 0,
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
    }
});
