// import Notify from '../../dist/notify/notify';
const { fetchGraphql } = require('../../../utils/util.js');
const { userbyid, updateuser } = require('../../../config/gql.js');
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

    data: {
        loading: true,
        phone: '',
        name: ''
    },

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
          let {name, phone} = this.data;
          if(name && phone) {
              fetchGraphql(updateuser,
                  {
                      id: app.globalData.userID,
                      telephone: phone,
                      nickname: name,
                      updatedAt: Date.now()
                  },
                  null,
                  'updateuser',
                  null
              )
              .then(user => {
                  console.log(user);
                  wx.showToast({
                      title: '修改成功',
                      icon: 'success'
                  });
              });

          } else {
              wx.showToast({
                  title: '无效的姓名或联系方式',
                  icon: 'none',
                  duration: 1000
              })
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
