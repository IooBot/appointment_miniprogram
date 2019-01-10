// pages/home/home.js
Page({
    data: {
        activeTab: 0,
        kind: 'success',
        refresh: ''
    },

    onReady() {
        wx.setNavigationBarTitle({
            title: '我的信息'
        })
    },

    onPullDownRefresh: function () {
        console.log('home 下拉');
        this.setData({
            refresh: Date.now()
        })
    },

    switchTab(e) {
        switch(e.detail.index) {
            case 0: 
                this.setData({
                    kind: 'success',
                    activeTab: 0
                });
                break;
            case 1:
                this.setData({
                    kind: 'cancelled',
                    activeTab: 1
                });
                break;
            case 2:
                this.setData({
                    kind: '',
                    activeTab: 2
                });
                break;
            defalut:
                break;
        }
    }
});
