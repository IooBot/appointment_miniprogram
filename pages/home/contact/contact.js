// import Notify from '../../dist/notify/notify';
const { fetchGraphql } = require('../../../utils/util.js');
const { userbyid } = require('../../../config/gql.js');
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

    lifetimes: {
        attached() {
            fetchGraphql(userbyid, { id: app.globalData.userID }, 'user', 'userbyid', this).then(user => {
                this.setData({
                    phone: user.telephone,
                    name: user.nickname,
                    loading: false
                })
            });
        }
    },
  /**
   * 组件的初始数据
   */
    data: {
        loading: true,
        phone: '',
        name: ''
    },

  /**
   * 组件的方法列表
   */
  methods: {
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
      submit: function() {
          if(this.data.name && this.data.phone) {
              wx.showToast({
                  title: '修改成功',
                  icon: 'success'
              });
              console.log('仅做展示，无操作');
          } else {
              wx.showToast({
                  title: '修改成功',
                  icon: 'success'
              });
          }


      },
      reset: function() {
          this.setData({
              name: '',
              phone: ''
          })
      }
  }
});
