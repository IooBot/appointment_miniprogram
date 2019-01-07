const {idGen, fetchGraphql} = require('../../utils/util.js')
const {createorderAndupdaterepertory, userbyid} = require('../../config/gql.js');
const app = getApp();

Page({
    data: {
        name: '',
        phone: '',
        checked: false,
        tempName: '',
        tempPhone: '',
        remark: '',
        defaultPhone: '',
        defaultName: '',
        people: 1,
        user: {},
        count: 1,
        serviceID: '',
        repertoryID: ''
    },

    formSubmit(e) {
        const {phone, name, count, people, remark, serviceID, repertoryID} = this.data;
        let varObj = {
            user_id: app.globalData.userID,
            service_id: serviceID,
            repertory_id: repertoryID,
            order_id: idGen('order'),
            payStatus: '',
            remark,
            payCount: '',
            payTime: '',
            customerNumber: people,
            orderStatus: 'success',
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
            count: count - 1,
            contactTelephone: phone,
            contactName: name
        };

        fetchGraphql(
            createorderAndupdaterepertory,
            varObj
        ).then(data => {
            console.log(data);
            wx.reLaunch({
                url: '../server/server'
            })
        });
    },

    formReset() {
        this.setData({
            name: '',
            phone: '',
            remark: '',
            people: 1,
            checked: false
        })
    },

    forme(e) {
        this.setData({ checked: e.detail });
        if (e.detail) {
            this.setData({
                tempName: this.data.name,
                tempPhone: this.data.phone,
                name: this.data.defaultName,
                phone: this.data.defaultPhone
            })
        } else {
            this.setData({
                name: this.data.tempName,
                phone: this.data.tempPhone
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        fetchGraphql(userbyid, {id: app.globalData.userID}, 'user', 'userbyid', this).then(user => {
            this.setData({
                defaultPhone: user.telephone,
                defaultName: user.nickname,
                count: Number(options.count),
                serviceID: options.id,
                repertoryID: options.repertoryID
            })
        });
    },

    phoneInput: function (e) {
        this.setData({
            phone: e.detail
        })
    },
    nameInput: function (e) {
        this.setData({
            name: e.detail
        })
    },
    remarkInput: function (e) {
        this.setData({
            remark: e.detail
        })
    },
    peopleSlide: function (e) {
        this.setData({
            people: e.detail
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '填写订单信息'
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