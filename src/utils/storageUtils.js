/*
进行local数据存储管理的功能模块
*/
import store  from 'store'
const USER_KEY = 'user_key'
export default{
    /*保存user */
    saveUser(user){
        store.set(USER_KEY, user)
        //localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    /*读取user */
    getUser(){
        return store.get(USER_KEY) || {}    //没有值 返回空对象
        //return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    },
    /*删除user */
    removeUser(){
        store.remove(USER_KEY)
        //localStorage.removeItem(USER_KEY)
    }
}
