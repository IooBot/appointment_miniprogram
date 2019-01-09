// pages/vant/vant.js
import Dialog from '../../dist/dialog/dialog';

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    cancelThis() {
        console.log('函数是进的来的');
        Dialog.confirm({
            title: '您确定取消？',
            message: '取消后30分钟内不能再次执行',

        }).then(() => {
            // on confirm
        }).catch(() => {
            // on cancel
        });
    }
});