// pages/manage/allOrders/allOrders.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        columns: ['成功', '已取消', '已删除', '全部'],
        showPopup: false,
        kind: 'success',
        kindType: '成功'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onConfirm(e) {
            const {value, index} = e.detail;
            switch (index) {
                case 0:
                    this.setData({
                        kind: 'success',
                        kindType: value
                    });
                    break;
                case 1:
                    this.setData({
                        kind: 'cancelled',
                        kindType: value
                    });
                case 2:
                    this.setData({
                        kind: 'deleted',
                        kindType: value
                    });
                case 3:
                    this.setData({
                        kind: 'all',
                        kindType: value
                    });
                    break;
                defalut:
                    break;
            }
            this.setData({
                showPopup: false
            })
        },

        onCancel() {
            this.setData({
                showPopup: false
            })
        },

        selectType() {
            this.setData({
                showPopup: true
            })
        }
    }
});
