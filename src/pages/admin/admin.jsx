import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUitls'
import { Redirect } from 'react-router-dom'
/*后台管理路由组件 */
export class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if(!user || !user.id){
            return <Redirect to='/login'/>
        }
        return (
            <div>
                Hello {user.name}
            </div>
        )
    }
}

export default Admin
