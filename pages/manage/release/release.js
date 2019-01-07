const {fetchGraphql} = require('../../../utils/util.js');
const {serverbyprops} = require('../../../config/gql.js');

Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        servers: '',
        server: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        useStorge() {
            const servers = wx.getStorageSync('servers');
            console.log(servers);
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

        selectServer(e) {
            this.setData({
                server: e.target.id
            })
        },

        addServer() {
            this.setData({
                server: 'add'
            })
        }
    },

    lifetimes: {
        attached() {
            this.useStorge()
        }
    }
});
