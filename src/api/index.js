/*
包含应用中所有接口请求函数的模块
每个接口对应每个函数
每个函数返回值都是Promise
*/
import ajax from './ajax'

const BASE = ''

//登录
export const reqLogin = (username, password)=>ajax(BASE + '/login', {username, password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

//