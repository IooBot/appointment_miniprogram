const {fetchGraphql} = require('../../../utils/util.js');
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
                        'orders',
                        'orderbyprops',
                        this
                    )
                        .then(orders => {
                            this.setData({
                                loading: false
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
                'orders',
                'orderbyprops',
                this
            )
                .then(orders => {
                    this.setData({
                        loading: false
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

        },

        cancelThis() {

        }
    }
});
