// pages/manage/release/serverAdd/serverAdd.js
Component({
    properties: {

    },

    data: {
        name: '',
        remark: ''
    },

    methods: {
        nameInput(e) {
            this.setData({
                name: e.detail
            })
        },

        remarkInput(e) {
            this.setData({
                remark: e.detail
            })
        },

        submit() {
            wx.showToast({
                title: '添加成功',
                icon: 'success'
            });
            console.log('仅做展示，无操作');
        },

        reset() {
            this.setData({
                name: '',
                remark: ''
            })
        }
    }
});
