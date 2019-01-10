const {fetchGraphql} = require('../../../utils/util.js');
const {serverbyprops} = require('../../../config/gql.js');

Component({
    properties: {
        refresh: {
            type: Number,
            observer(newVal) {
                if (newVal !== '' && Date.now() - newVal < 1000) {
                    this.noUseStorge(() => {
                        this.setData({
                            serverID: ''
                        });
                        wx.stopPullDownRefresh({
                            complete: function () {
                                wx.showToast({
                                    title: '已刷新',
                                    icon: 'success',
                                    duration: 800
                                });
                            }
                        });
                    });
                }
            }
        }
    },

    data: {
        servers: '',
        serverID: '',
    },

    methods: {
        useStorge(func) {
            const servers = wx.getStorageSync('servers');
            if (servers) {
                this.setData({
                    servers,
                    loading: false
                });
                if(func) func();
            } else {
                fetchGraphql(serverbyprops, {}, 'servers', 'serverbyprops', this).then(servers => {
                    wx.setStorage({
                        key: 'servers',
                        data: servers
                    });
                    this.setData({
                        loading: false
                    });
                    if(func) func();
                })
            }
        },

        noUseStorge(func) {
            fetchGraphql(serverbyprops, {}, 'servers', 'serverbyprops', this).then(servers => {
                this.setData({
                    loading: false
                });
                if(func) func();
            })
        },

        selectServer(e) {
            if(e.target.id === this.data.serverID) {
                wx.startPullDownRefresh();
            } else {
                this.setData({
                    serverID: e.target.id
                });
            }

            wx.showLoading({
                title: '获取服务中',
            })
        },

        addServer() {
            this.setData({
                serverID: 'add'
            })
        }
    },

    lifetimes: {
        attached() {
            this.noUseStorge()
        }
    }
});
