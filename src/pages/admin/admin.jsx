import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUitls'
import { Redirect } from 'react-router-dom'
import {Layout} from 'antd'

const {Header, Footer, Sider, Content} = Layout

/*后台管理路由组件 */
export class Admin extends Component {
    render() {
        const user = memoryUtils.user
        console.log(memoryUtils.user)
        if(!user){ //!user.id
            return <Redirect to='/login'/>
        }
        return (
            <Layout style = {{height:'100%'}}>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin
