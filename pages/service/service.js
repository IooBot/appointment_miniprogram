// pages/service/service.js
const {fetchGraphql, dateTime} = require('../../utils/util.js');
const {servicebyprops} = require('../../config/gql.js');

Page({
    data: {
        serverID: '',
        loading: true,
        services: ''
    },

    chooseThis(e) {
        wx.navigateTo({
            url: `../message/message?id=${e.target.id}&count=${e.target.dataset.count}&repertoryID=${e.target.dataset.repertoryid}`,
        })
    },

    onLoad: function (options) {
        this.setData({
            serverID: options.id
        });
        fetchGraphql(servicebyprops, {server_id: this.data.serverID}, null, 'servicebyprops', null).then(services => {
            services.forEach(service => {
                service.formatDate = dateTime(Number(service.startTime), true).date;
                service.formatStartTime = dateTime(Number(service.startTime), true).time;
                service.formatEndTime = dateTime(Number(service.startTime) + Number(service.lastTime), true).time;
            });
            this.setData({
                loading: false,
                services
            });
        });
    },

    onReady: function () {
        wx.setNavigationBarTitle({
            title: '选择TA的服务'
        })
    },

    onPullDownRefresh: function () {

    }
});