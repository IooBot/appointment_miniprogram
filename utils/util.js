const idGen = (kind) => {
  return kind + '_' + Date.now() + '_' + Math.random().toString().slice(-8);
};

// const graphqlURL = 'http://service-a7y7bobr-1251945881.ap-shanghai.apigateway.myqcloud.com/test/graphql';
const graphqlURL = 'https://order.szu.im/graphql';

const fetchGraphql = (query, variables, dataName, dataBack, that) => {
  // 如果给了 databack，则返回对应的数据，没有则返回全部
  // 如果给了 dataName，则 setData
  return new Promise((resolve, reject) => {
    let _this = that;
    wx.request({
      url: graphqlURL,
      method: 'POST',
      data: JSON.stringify({
        query,
        variables
      }),

      success: function (res) {
        let data;
        if(dataBack) {
          data = res.data.data[dataBack];
        } else {
          data = res.data.data;
        }

        if (dataName) {
          _this.setData({
            [dataName]: data
          })
        }
      
        resolve(data);
      }
    })
  })
};

module.exports = {
  idGen: idGen,
  fetchGraphql: fetchGraphql
};
