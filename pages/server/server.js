// pages/display/display.js
const {fetchGraphql} = require('../../utils/util.js');
const {serverbyprops} = require('../../config/gql.js');

Page({
    data: {
        servers: '',
        loading: true,
        imgUrls: [
            'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
            'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',
            'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png',
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000
    },

    useStorge() {
        const servers = wx.getStorageSync('servers');
        if (servers) {
            this.setData({
                servers,
                loading: false
            })
        } else {
            fetchGraphql(serverbyprops, {}, 'servers', 'serverbyprops', this).then(servers => {
                wx.setStorage({
                    key: 'servers',
                    data: servers
                });
                this.setData({
                    loading: false
                })
            })
        }
    },

    noUserStorge() {
        fetchGraphql(serverbyprops, {}, 'servers', 'serverbyprops', this).then(servers => {
            this.setData({
                loading: false
            })
        })
    },

    onLoad() {
        this.noUserStorge();
        wx.setNavigationBarTitle({
            title: '选择一位技师'
        })
    },

    chooseMe(e) {
        wx.navigateTo({
            url: `../service/service?id=${e.target.id}`,
        })
    }
});
