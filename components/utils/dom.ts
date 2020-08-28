
/**
 * 事件监听封装
 * author kangheng 2020/7/1
 */
export const on = function(element, event, handler, useCapture = true){
    if(document.addEventListener){
        return element.addEventListener(event, handler, useCapture)
    }else{
        return element.attachEvent('on' + event, handler)
    }
};


export const off = function(element, event, handler, useCapture = true) {
    if(document.addEventListener){
        return element.removeEventListener(event, handler, useCapture)
    }else{
        return element.detachEvent('on' + event, handler)
    }
};

/**
 * 事件监听兼容性处理  --  iview版本
 * author kangheng 2020/7/1
 */
// import { Vue } from 'vue-property-decorator';
// const wmIsServer = Vue.prototype.isServer;

// export const on = (function(){
//     if(!wmIsServer && document.addEventListener){
//         return function( element, event, handler, useCapture = true){
//             if(element && event && handler){
//                 element.addEventListener(event, handler, useCapture)
//             }
//         }
//     }else{
//         return function( element, event, handler){
//             if(element && event && handler){
//                 element.attachEvent('on' + event, handler)
//             }
//         }
//     }
// })();


// export const off = (function() {
//     if (!wmIsServer && document.removeEventListener) {
//         return function(element, event, handler, useCapture = false) {
//             if (element && event) {
//                 element.removeEventListener(event, handler, useCapture);
//             }
//         };
//     } else {
//         return function(element, event, handler) {
//             if (element && event) {
//                 element.detachEvent('on' + event, handler);
//             }
//         };
//     }
// })();

