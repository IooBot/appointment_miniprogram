const {fetchGraphql, dateTime} = require('../../../utils/util.js');
const {orderbyprops, updateorderAndupdaterepertory, updateorder} = require('../../../config/gql.js');
const app = getApp();

Component({
    properties: {
        kind: {
            type: String,
            value: 'success',
            observer(newVal) {
                this.setData({
                    loading: true,
                    orders: '',
                    orderStatus: newVal
                });
                if (newVal !== '') {
                    this.noUseStorge(newVal);
                }
            }
        },

        refresh: {
            type: Number,
            observer(newVal) {
                if (newVal !== '' && Date.now() - newVal < 1000) {
                    this.noUseStorge(this.data.orderStatus, () => {
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


    lifetimes: {
        attached() {
            this.noUseStorge(this.data.orderStatus);
        }
    },

    data: {
        loading: true,
        orders: '',
        orderStatus: 'success'
    },

    methods: {
        noUseStorge (orderStatus, func) {
            fetchGraphql(orderbyprops,
                {
                    user_id: app.globalData.userID,
                    orderStatus
                },
                null,
                'orderbyprops',
                null
            )
                .then(orders => {
                    orders.forEach(order => {
                        order.service_id.formatDate = dateTime(Number(order.service_id.startTime), true).date;
                        order.service_id.formatStartTime = dateTime(Number(order.service_id.startTime), true).time;
                        order.service_id.formatEndTime = dateTime(Number(order.service_id.startTime) + Number(order.service_id.lastTime), true).time;
                    });
                    this.setData({
                        loading: false,
                        orders
                    });
                    if (func) func();
                });
        },

        deleteThis(e) {
            let orderID = e.target.id;
            fetchGraphql(updateorder,
                {
                    id: orderID,
                    user_id: app.globalData.userID,
                    orderStatus: 'deleted',
                    updatedAt: Date.now()
                },
                null,
                'updateorder',
                null
            )
                .then(order => {
                    wx.startPullDownRefresh();
                });
        },

        cancelThis(e) {
            let orderID = e.target.id;
            let repertoryID = e.target.dataset.repertoryid;
            let count = e.target.dataset.count;
            wx.showModal({
                title: '确定取消？',
                content: '真的不考虑考虑吗?',
                success(res) {
                    if (res.confirm) {
                        fetchGraphql(updateorderAndupdaterepertory,
                            {
                                order_id: orderID,
                                repertory_id: repertoryID,
                                updatedAt: Date.now(),
                                orderStatus: 'cancelled',
                                count: count + 1
                            }
                        )
                            .then(updateBothTwo => {
                                wx.startPullDownRefresh();
                            });

                    } else if (res.cancel) {
                        console.log('你取消了')
                    }
                }
            });
        }
    }
});
