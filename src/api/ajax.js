/*
发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1. 优化：统一处理请求异常
    在外层包一个自己创建的promise对象
    请求出错时，不去reject(error) 而是显示错误提示
*/

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, type='get'){

    return new Promise((resolve, reject) =>{
        let promise
        //1. 执行异步ajax
        if(type == 'get')
            promise = axios.get(url, {params:data})
        else
            promise = axios.post(url, data)
        //2. 成功 调用resolve(value)
        promise.then(resonse => {
            resolve(resonse)
        })
        //3. 失败 不掉用reject(reason) 而提示异常信息
        .catch(error => {
            message.error('请求出错：'+ error.message)
        })
        
    })

    
}