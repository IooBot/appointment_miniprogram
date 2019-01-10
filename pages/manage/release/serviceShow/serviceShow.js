const {fetchGraphql} = require('../../../../utils/util.js');
const {servicebyprops} = require('../../../../config/gql.js');

Component({
    properties: {
        serverID: {
            type: String,
            observer(newVal) {
                this.setData({
                    services: '',
                    service: ''
                });
                if (newVal !== '') {
                    fetchGraphql(servicebyprops,
                        {server_id: newVal},
                        'services',
                        'servicebyprops',
                        this
                    )
                    .then(services => {
                        console.log(services);
                        wx.hideLoading()
                    })
                }
            }
        }
    },

    data: {
        services: '',
        service: ''
    },

    methods: {
        selectService(e) {
            let index = e.target.dataset.index;
            if(index === 'add') {
                this.setData({
                    service: {id: 'add', server_id: {id: this.properties.serverID}}
                })
            } else {
                let service = this.data.services[index];
                delete service.server_id.img;
                this.setData({
                    service
                });
            }
        }
    }
});
