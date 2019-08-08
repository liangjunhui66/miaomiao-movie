import Vue from 'vue'
import MessageBox from './MessageBox'
import { deflate } from 'zlib';

export var messageBox = (function(){
    var defaults = {
        title: '',
        content: '',
        cancel: '',
        ok: '',
        handleCancel: null,
        handleOk:null,

    };
    return function (opts) {
        for(var attr in opts){
            defaults[attr] = opts[attr]
        }
        var myComponent = Vue.extend(MessageBox);

        var vm = new myComponent({
            el : document.createElement('div'),
            data : {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok,
            },
            methods: {
                handleCancel() {
                    defaults.handleCancel && defaults.handleCancel.bind(this)();
                    document.body.removeChild( vm.$el );
                },
                handleOk() {
                    defaults.handleOk && defaults.handleOk.bind(this)();
                    document.body.removeChild( vm.$el );
                }
            }
        })
        document.body.appendChild( vm.$el )
    }
})()