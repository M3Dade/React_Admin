import React, { Component } from 'react'
import {
    Card, 
    Select,
    Input,
    Button,
    Table,
} from 'antd'
import {
    PlusOutlined
}from '@ant-design/icons'
import LinkButton from '../../compmont/link-button'
import {reqProducts} from '../../api/index'
import {PAGE_SIZE} from '../../utils/constants'

const Option = Select.Option

/**
 * 默认子路由组件
 */
export default class ProductHome extends Component {
    
    state = {
        total:1,
        products:[{
            "id":"1",
            "name":"computer",
            "desc":"new",
            "price":2000,
            "status":1
        }],
    }
    
    initCollumns = () =>{
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name',    //对应数据 json中key值
            //   key: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              render:(price)=>'￥'+price
            },
            {   
                width:100,
                title: '状态',
                dataIndex: 'status',
                render:(status)=> { //status == 0? '下架': '在售'
                    return(
                        <span>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                width:100,
                title: '操作',
                render:(product)=> {
                    return(
                        <span>
                            <LinkButton onClick={() => this.props.history.push('product/detail')}>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            },
          ];
    }

    getProducts = async (pageNum)=>{
        const result = await reqProducts(pageNum, PAGE_SIZE)
        if(result.status === 0){
            const {total, list} = result.data
            this.setState({
                total, 
                products:list
            })
        }
    }

    componentWillMount(){
        this.initCollumns()
    }

    componentDidMount(){
        // this.getProducts(1)
    }

    render() {

    const {products, total} = this.state

        // const dataSource = [
        //     {
        //       key: '1',
        //       name: '胡彦斌',
        //       age: 32,
        //       address: '西湖区湖底公园1号',
        //     },
        //     {
        //       key: '2',
        //       name: '胡彦祖',
        //       age: 42,
        //       address: '西湖区湖底公园1号',
        //     },
        //   ];
          
        const title = (
        <span>
            <Select value='1' style={{width:150}}>
                <Option value='1'>按名称搜索</Option>
                <Option value='2'>按描述搜索</Option>
            </Select>
            <Input placeholder='关键字' style={{width:150, margin:'0 15px'}}/>
            <Button type='primary'>搜索</Button>
        </span>)

        const extra = (
            <Button type='primary' icon={<PlusOutlined />} >
                添加商品
            </Button>)            

        return (
            <Card title={title} extra={extra}>
                <Table 
                    bordered
                    rowKey='id'
                    dataSource={products} 
                    columns={this.columns}
                    pagination = {{total:total,  defaultPageSize:PAGE_SIZE, showQuickJumper:true}}>
                </Table>
            </Card>
        )
    }
}
