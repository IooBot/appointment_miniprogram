import {dateTime} from '../../../../../utils/util';

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
                        price: 0,
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
        price: 0,
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
                price: 0,
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
            wx.showToast({
                title: this.data.service.id==='add'?'已添加': '已修改',
                icon: 'success',
                duration: 2000
            });
            console.log('仅做展示，无操作');
        },
    }
});
