// pages/service/service.js
const {fetchGraphql} = require('../../utils/util.js');
const {servicebyprops} = require('../../config/gql.js');

Page({
    data: {
        serverID: '',
        loading: true,
        service: ''
    },

    chooseThis(e) {
        wx.navigateTo({
            url: `../message/message?id=${e.target.id}&count=${e.target.dataset.count}&repertoryID=${e.target.dataset.repertoryid}`,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (options) {
        this.setData({
            serverID: options.id
        });
        fetchGraphql(servicebyprops, {server_id: this.data.serverID}, 'service', 'servicebyprops', this).then(service => {
            this.setData({
                loading: false,
                service
            });
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '选择TA的服务'
        })
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
});