import React, { Component } from 'react'
import{
    Card,
    Table,
    Button,
    message
}from 'antd'

import {PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../compmont/link-button'
import {reqCategorys} from '../../api'

export default class Category extends Component {
    
    //放在state里 state改变 会重新render
    state = {
        loading:false, //是否正在获取数据
        categorys:[], //一级分类列表 dataSourse
    }
    
    /**
     * 初始化table所有列的数组
     */
    initColumns = () =>{
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',    //显示数据对应的属性名
            },
            {
                title: '操作',
                width:300,
                render: () => (     //返回需要显示的界面标签
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                )
              },
          ];
    }

    /**
     *异步获取一级分类列表显示 
     */
    getCategorys = async () =>{
        //发请求前 显示loading
        this.setState({loading:true})
        //发送异步ajax请求 获取数据
        const result = await reqCategorys(0)    //await promise对象
        //请求完成后，隐藏loading
        this.setState({loading:false})
        const response = result.data
        if(response.status === 0){
            const categorys = response.data
            //更新状态
            this.setState({
                categorys
            })
        }else{
            message.error('获取分类列表失败')
        }
    }


    /**
     * 为第一次render()准备数据
     */
    componentWillMount(){
        this.initColumns();
    }

    /**
     * 执行异步任务 发送ajax请求
     */
    componentDidMount(){
        this.getCategorys();
    }

    render() {  //放入render里 每次重新render 都会重新创建 所以columns不放入render

        //读取state数据
        const {categorys, loading} = this.state

        //card 左侧
        const title = '一级分类列表'
        //card 右侧
        const extra = (
            <Button type='primary'>
                <PlusOutlined />
                添加
            </Button>
        )


        return (
            <Card title={title} extra={extra}>
                <Table 
                    bordered = {true}
                    loading = {loading}
                    rowKey = '_id'
                    dataSource={categorys} //数组变量
                    columns={this.columns} 
                    pagination={{defaultPageSize:5, showQuickJumper:true}}
                    />;   
          </Card>
        )
    }
}
