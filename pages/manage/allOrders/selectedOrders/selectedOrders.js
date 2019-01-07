const {fetchGraphql} = require('../../../../utils/util.js');
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
                        'orders',
                        'adminorderbyprops',
                        this
                    )
                        .then(orders => {
                            this.setData({
                                loading: false
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
                'orders',
                'adminorderbyprops',
                this
            )
                .then(orders => {
                    this.setData({
                        loading: false
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
