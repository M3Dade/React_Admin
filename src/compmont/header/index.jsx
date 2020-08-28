import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import memoryUitls from '../../utils/memoryUitls'
import storageUtils from '../../utils/storageUtils'
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../link-button'
import './index.less'
import Clock from './clock'

const { confirm } = Modal;

class Header extends Component {
    
    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if(item.key === path){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    title = cItem.title
                }
            }
            
        })
        return title;
    }

    logout = () => {
        confirm({
          title: ' 确定退出吗',
          icon: <ExclamationCircleOutlined />,
          content: '',
          onOk:()=>{
            storageUtils.removeUser()
            memoryUitls.user = {}
            this.props.history.replace('/login')
        },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    //当前组件卸载之前调用
    componentWillUnmount(){
        // clearInterval(this.intervalId)
    }

    render() {

        const username = memoryUitls.user.username

        const title = this.getTitle()

        return (
           <div className="header">
               <div className="header-top">
                   <span>欢迎，{username} </span>
                   <LinkButton onClick={this.logout}><span>退出</span></LinkButton>
                   {/* <a href="javascript:" onClick={this.logout}>退出</a> */}
               </div>
               <div className="header-bottem">
                   <div className="header-bottom-left"><span>{title}</span></div>
                   <div className="header-bottom-right">
                       {/* <span>2020-8-18</span>
                        <img src="" alt="weather"/> */}
                        <Clock />
                    </div>
               </div>
           </div>
        )
    }
}

export default withRouter(Header)