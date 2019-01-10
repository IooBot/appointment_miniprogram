import {idGen, dateTime, fetchGraphql} from '../../../../../utils/util';
import {createserviceAndcreaterepertory, updateserviceAndupdaterepertory} from '../../../../../config/gql';

Component({
    properties: {
        service: {
            type: Object,
            observer(newVal) {
                this.setData({
                    service: newVal
                });
                let service = newVal;
                console.log(newVal);
                service.id === 'add' ?
                    this.setData({
                        price: '',
                        description: '',
                        repertory: 0,
                        date: dateTime(Date.now(), true).date,
                        startTime: dateTime(Date.now(), true).time,
                        endTime: dateTime(Date.now(), true).time
                    })
                    :
                    this.setData({
                        date: dateTime(Number(service.startTime), true).date,
                        startTime: dateTime(Number(service.startTime), true).time,
                        endTime: dateTime(Number(service.startTime) + Number(service.lastTime), true).time,
                        price: service.price,
                        description: service.description,
                        repertory: service.repertory_id.count
                    })
            }
        }
    },

    data: {
        service: '',
        price: '',
        description: '',
        repertory: 0,
        date: '2019-01-01',
        startTime: '00:00',
        endTime: '00:01'
    },

    lifetimes: {
        attached() {
            let service = this.data.service;
            service.id === 'add' ?
                this.setData({
                    date: dateTime(Date.now(), true).date,
                    startTime: dateTime(Date.now(), true).time,
                    endTime: dateTime(Date.now(), true).time
                })
                :
                this.setData({
                    date: dateTime(Number(service.startTime), true).date,
                    startTime: dateTime(Number(service.startTime), true).time,
                    endTime: dateTime(Number(service.startTime) + Number(service.lastTime), true).time,
                    price: service.price,
                    description: service.description,
                    repertory: service.repertory_id.count
                })
        }
    },

    methods: {
        priceInput(e) {
            this.setData({
                price: e.detail
            })
        },

        descriptionInput(e) {
            this.setData({
                description: e.detail
            })
        },

        repertorySlide(e) {
            this.setData({
                repertory: e.detail
            })
        },

        dateChange(e) {
            this.setData({
                date: e.detail.value
            })
        },

        startTimeChange(e) {
            this.setData({
                startTime: e.detail.value
            })
        },

        endTimeChange(e) {
            this.setData({
                endTime: e.detail.value
            })
        },

        reset() {
            this.setData({
                price: '',
                description: '',
                repertory: 0,
                date: dateTime(Date.now(), true).date,
                startTime: dateTime(Date.now(), true).time,
                endTime: dateTime(Date.now(), true).time
            })
        },

        submit() {
            let startTime = dateTime({date: this.data.date, time: this.data.startTime}, false);
            let endTime = dateTime({date: this.data.date, time: this.data.endTime}, false);
            let lastTime = endTime - startTime;
            let {price, description, repertory} = this.data;
            if (this.data.service.id === 'add') {
                fetchGraphql(createserviceAndcreaterepertory,
                    {
                        server_id: this.properties.service.server_id.id,
                        service_id: idGen('service'),
                        repertory_id: idGen('repertory'),
                        description,
                        startTime,
                        lastTime,
                        price,
                        count: repertory,
                        createdAt: Date.now(),
                        updatedAt: ''
                    }
                )
                    .then(result => {
                        wx.startPullDownRefresh()
                    });
            } else {
                fetchGraphql(updateserviceAndupdaterepertory,
                    {
                        server_id: this.properties.service.server_id.id,
                        service_id: this.properties.service.id,
                        repertory_id: this.properties.service.repertory_id.id,
                        description,
                        startTime,
                        lastTime,
                        price,
                        count: repertory,
                        updatedAt: Date.now()
                    }
                )
                    .then(result => {
                        wx.startPullDownRefresh()
                    });
            }
        },
    }
});
