// import Dialog from '../../../dist/dialog/dialog';
const {fetchGraphql, dateTime} = require('../../../utils/util.js');
const {orderbyprops} = require('../../../config/gql.js');
const app = getApp();

Component({
    properties: {
        kind: {
            type: String,
            value: 'success',
            observer(newVal, oldVal, changedPath) {
                this.setData({
                    loading: true,
                    orders: ''
                });
                if (newVal !== '') {
                    fetchGraphql(orderbyprops,
                        {
                            user_id: app.globalData.userID,
                            orderStatus: newVal
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
                            console.log(orders)
                        });
                }
            }
        }
    },

    lifetimes: {
        attached() {
            // 在组件实例进入页面节点树时执行
            fetchGraphql(orderbyprops,
                {
                    user_id: app.globalData.userID,
                    orderStatus: 'success'
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
                    })
                });
        }
    },

    data: {
        loading: true,
        orders: ''
    },

    methods: {
        deleteThis() {
            wx.showToast({
                title: '已删除',
                icon: 'success',
                duration: 2000
            });
            console.log('仅做展示，无操作');
        },

        cancelThis() {
            // console.log('函数是进的来的');
            // Dialog.confirm({
            //     title: '您确定取消？',
            //     message: '取消后30分钟内不能再次执行',
            //
            // }).then(() => {
            //     // on confirm
            // }).catch(() => {
            //     // on cancel
            // });

            wx.showModal({
                title: '确定取消？',
                content: '取消后30分钟内不能再次预约',
                success(res) {
                    if (res.confirm) {
                        console.log('仅做展示，无操作');
                        wx.showToast({
                            title: '已取消',
                            icon: 'success',
                            duration: 2000
                        });
                    } else if (res.cancel) {
                        console.log('你取消了')
                    }
                }
            });
        }
    }
});
