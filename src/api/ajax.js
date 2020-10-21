/*
    发送异步ajax请求函数模块
    封装 axios
    返回promise对象
*/
/*
优化：1.统一处理请求异常
        在外层包一个自己创建的promise对象
        请求出错 显示错误提示
*/

import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data={}, type='GET'){ //data可能没有参数 给默认值 空对象
    
    return new Promise((resolve, reject) =>{
        debugger
        let promise
        //1.执行ajax
        if(type === 'GET')
            promise = axios.get(url, {params:data})  //{params: } 配置对象
        else
            promise = axios.post(url, data)
        //2.成功 resolve
        promise.then( response => {
            resolve(response)
        //3.失败 不调用reject（为了统一处理） 而是提示异常信息 (处理完成异常)
        }).catch(error=>{
            message.error('请求出错了：' + error.message)
        })
        
    })
   
        // if(type === 'GET')
        //     return axios.get(url, {params:data})  //{params: } 配置对象
        // else
        //     return axios.post(url, data)
       
        

}