import React, { Component } from 'react'
import logo from '../../assets/images/logo.png'
import moduleName from '../left-nav/index.less'
import {Link, withRouter} from 'react-router-dom'
import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
  } from '@ant-design/icons';
import menuList from '../../config/menuConfig'
const {SubMenu} = Menu
/*
左侧导航
*/
class LeftNav extends Component {
    /*
    根据menuConfig map+递归动态生成
     */
    getMenuNodes_map = (menuList)=>{
        return menuList.map(item=>{
            if(!item.children){
                return(<Menu.Item key={item.key} >
                    <Link to={item.key}>
                     <span>{item.title}</span>
                    </Link>
                </Menu.Item>)
            }else{
                return(<SubMenu key={item.key} title={item.title}>
                    {this.getMenuNodes(item.children)}
                </SubMenu>)
            }
        })
    }
    
    getMenuNodes = (menuList)=>{
        return menuList.reduce( (pre, item)  => {
            if(!item.children){
                pre.push((<Menu.Item key={item.key} >
                    <Link to={item.key}>
                     <span>{item.title}</span>
                    </Link>
                </Menu.Item>))
            }else{
                pre.push((<SubMenu key={item.key} title={item.title}>
                    {this.getMenuNodes(item.children)}
                </SubMenu>))
            }
            return pre
        }, [])
    }

    state = {
        collapsed: false,
      };
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };

    render() {
      const path = this.props.location.pathname

        return (
            <div style={{ width: 200 }}>
            <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
            <Link to='/' className="left-nav">
                <header className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>血液识别</h1>
                </header>
            </Link>
            
            <Menu
              defaultSelectedKeys={['1']}
              // selectedKeys={[path]}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              {this.getMenuNodes(menuList)}
              {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                  <Link to='/home'>
                    <span>首页</span>
                  </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                  <Link to='/user'>
                     <span>上传图片</span>
                  </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                Option 3
              </Menu.Item>
              <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                <Menu.Item key="5" icon={<MailOutlined />}>品类管理</Menu.Item>
                <Menu.Item key="6" icon={<MailOutlined />}>商品管理</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </SubMenu> */}
            </Menu>
          </div>
        )
    }
}

/*
高阶组件 （函数
包装非路由组件 返回新组建
新组件向非路由组件传递3个属性 history location match
*/
export default withRouter(LeftNav)