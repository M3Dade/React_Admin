/*
包含应用中所有接口请求函数的模块
每个接口对应每个函数
每个函数返回值都是Promise
*/
import ajax from './ajax'

const BASE = ''

//登录
<<<<<<< HEAD
export const reqLogin = (username, password)=>{ajax(BASE + '/login', {username, password}, 'POST')}
=======
export const reqLogin = async (username, password)=>{await ajax('/login', {username, password}, 'POST')}
>>>>>>> 2c7a443fd6b1c2e83b8f14c7a25eae0365b819f8

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

//