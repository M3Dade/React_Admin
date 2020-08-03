/*
包含应用中所有接口请求函数的模块
每个函数返回值都是Promise
*/
import ajax from './ajax'

//登录
export const reqLogin = async (username, password)=>{await ajax('/login', {username, password}, 'POST')}

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

//