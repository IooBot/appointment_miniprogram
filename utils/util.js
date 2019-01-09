const idGen = (kind) => {
    return kind + '_' + Date.now() + '_' + Math.random().toString().slice(-8);
};

const graphqlURL = 'https://orderfcdb.ioobot.cn/graphql';

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
                if (dataBack) {
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

const dateTime = (data, format) => {
    if (format) {
        let date = new Date(data);
        return {
            date: date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()),
            time: (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +':'+ (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        }
    } else {
        return new Date((data.date + ' ' + data.time + ':00').replace(/-/g, '/')).getTime();
    }
};

module.exports = {
    idGen: idGen,
    fetchGraphql: fetchGraphql,
    dateTime: dateTime
};
