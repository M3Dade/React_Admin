import React, { Component } from 'react'
import './login.less'
import logo from './images/logo.gif'
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api/index'
import memoryUtils from '../../utils/memoryUitls'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';
/*登陆路由组件 */
export class login extends Component {
    // onFinish = (values) => {
    //     console.log('Received values of form: ', values);
    //     const {username, password} = values;
    //     reqLogin(username, password)
    //         .then(res => console.log(res.data))
    //         .catch(err => console.log(err))
    //   };

    //async await 简化promise使用
    //消灭回调函数
    //同步编码实现异步流程
    //不要promise对象 要其执行成功的value数据
    // onFinish = (async (values) => {
    //     console.log('Received values of form: ', values);
    //     const {username, password} = values;
    //     try{
    //         const response = await reqLogin(username, password)
    //         console.log('请求成功', response.data)
    //     }catch(error){
    //         console.log('请求出错了', error)
    //     }
    //   });

     onFinish = (async (values) => {
        console.log('Received values of form: ', values);
        const {username, password} = values;
        const response = await reqLogin(username, password)
        console.log('请求成功', response.data)
      });

    onFinishFailed = errorInfo => {
        message.error('检验失败',errorInfo);
      };
    
    render() {
        const user = memoryUtils.user
        if(user && user._id){
            return <Redirect to='/'/>
        }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"></img>
                    <h1>React后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    >
                    <Form.Item
                        name="username"
                        //声明式验证：antd定义好的规则
                        rules={[{ required: true, whitespace:true, message: '用户名必须输入' },
                                { min:4, message: '用户名至少4位' },
                                { max:12, message: '用户名最多12位' },
                                { pattern:/^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        //自定义验证
                        rules={[
                            () => ({
                                validator(rule, value) {
                                    if(!value){
                                        return Promise.reject('密码必须输入');
                                    }else if(value.length<4){
                                        return Promise.reject('密码长度不能小于4');
                                    }else if(value.length>12){
                                        return Promise.reject('密码长度不能大于12位');
                                    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
                                        return Promise.reject('密码必须是英文、数字或下划线组成');
                                    }else
                                        return Promise.resolve();
                                },
                              })
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                        </Button>
                    </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }


}

export default login
