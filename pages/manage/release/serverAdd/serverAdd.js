import {idGen, fetchGraphql} from '../../../../utils/util';
import {createserver} from '../../../../config/gql';

Component({
    properties: {},

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
            let {name, remark} = this.data;
            fetchGraphql(createserver,
                {
                    id: idGen('server'),
                    name,
                    description: remark,
                    img: '',
                    createdAt: Date.now(),
                    updatedAt: ''
                },
                null,
                'createserver',
                null
            )
                .then(server => {
                    wx.startPullDownRefresh();
                });
        },

        reset() {
            this.setData({
                name: '',
                remark: ''
            })
        }
    }
});
