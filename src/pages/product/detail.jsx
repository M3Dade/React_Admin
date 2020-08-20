import React, { Component } from 'react'
import {
    Card, 
    List,
    Button, 
} from 'antd'
import {
    ArrowLeftOutlined
}from '@ant-design/icons'
import './product.less'
const Item = List.Item
/**
 * Product详情子路由组件
 */
export default class ProductDetail extends Component {
    render() {

        // const {name, desc, price, detail} = this.props.location.state.product

        const title = (
            <Button icon={<ArrowLeftOutlined />} 
                    style={{color:'#1da57a', marginRight:15, fontSize:20, blockSize:40}} 
                    onClick={() => this.props.history.goBack()}>
                商品详情
            </Button>
        )

        return (
            <Card title={title} className='product-detail'>
                <List itemLayout="vertical">
                    <Item>
                        <span className="left">商品名称</span>
                        {/* <span>{name}</span> */}
                    </Item>
                    <Item>
                        <span className="left">商品描述</span>
                        {/* <span>{desc}</span> */}
                    </Item>
                    <Item>
                        <span className="left">商品价格</span>
                        {/* <span>{price}</span> */}
                    </Item>
                    <Item>
                        <span className="left">商品分类</span>
                        <span>a</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片</span>
                        <img className="product-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597842947388&di=12433d1033c8d8f1006f91e663c33963&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb8389b504fc2d562af74b44cec1190ef76c66c16.jpg"/>
                        <img className="product-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597842947388&di=12433d1033c8d8f1006f91e663c33963&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb8389b504fc2d562af74b44cec1190ef76c66c16.jpg"/>
                    </Item>
                    <Item>
                        <span className="left">商品详情</span>
                        <span dangerouslySetInnerHTML = {{__html:'<h1>商品详情的内容标签</h1>'}}/>
                    </Item>
                </List>
            </Card>
        )
    }
}
