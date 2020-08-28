/*
包含应用中所有接口请求函数的模块
每个接口对应每个函数
每个函数返回值都是Promise
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = ''

//登录
export const reqLogin = (username, password)=>ajax(BASE + '/login', {username, password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

//json请求的接口请求函数
// export const reqWeather = (cityId) =>{

//     return new Promise((resolve, reject) => {
//         const url = `http://api.map.baidu.com/weather/v1/?district_id=${cityId}&output=json&ak=vk4a7cmDRSDy1wAjKkcfhgpE9bG3EGsz&data_type=all`
//         jsonp(url, {}, (error, data)=>{
//             console.log('jsonp()', error, data)
//             debugger
//             console.log("data:"+data)
//             if(!error && data.status === 0){
//                 const {date, week, text_day} = data.result.forecasts[0]
//                 resolve(date, week, text_day)
//             }
//             else{
//                 message.error('获取天气信息失败！')
//             }
//         })
//     })
    
// }
// reqWeather('330104');

/*
json请求的接口请求函数
 */
export const reqWeather = (cityId) => {

    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/weather/v1/?district_id=${cityId}&output=json&ak=vk4a7cmDRSDy1wAjKkcfhgpE9bG3EGsz&data_type=all`
      // 发送jsonp请求
      jsonp(url, {}, (err, data) => {
        console.log('jsonp()', err, data)
        // 如果成功了
        if (!err && data.status=== 0) {
          // 取出需要的数据
          const {date, week, text_day} = data.result.forecasts[0]
                resolve(date, week, text_day)
        } else {
          // 如果失败了
          message.error('获取天气信息失败!')
        }
  
      })
    })
  }
  reqWeather('330104');

// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax(BASE+'/image/delete', {name}, 'POST')

// 添加/修改blood
// export const reqAddOrUpdateBlood = (blood) => ajax(BASE + '')

//预测图像
export const reqPredict = (name) => ajax(BASE + '/predict', {name}, 'POST')