const {fetchGraphql, dateTime} = require('../../../../utils/util.js');
const {adminorderbyprops} = require('../../../../config/gql.js');

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
                    let varObj = {orderStatus: newVal};
                    if (newVal === 'all') varObj = {};
                    fetchGraphql(adminorderbyprops,
                        varObj,
                        null,
                        'adminorderbyprops',
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
                        });
                }
            }
        }
    },

    lifetimes: {
        attached() {
            // 在组件实例进入页面节点树时执行
            fetchGraphql(adminorderbyprops,
                {
                    orderStatus: 'success'
                },
                null,
                'adminorderbyprops',
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
                });
        }
    },

    data: {
        loading: true,
        orders: ''
    },

    methods: {}
});
