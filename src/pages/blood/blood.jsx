import React, { Component } from 'react'
import  './blood.less'
import PicturesWall from './pictures-wall'
import {
    Card,
    List
} from 'antd'
const Item = List.Item

export default class Blood extends Component {
    
    constructor(props){
        super(props)
        //创建用来保存ref标签对象的容器
        this.pw = React.createRef()
    }

    submit = () =>{
        this.props.form.validateFields((error, values) =>{
            if(!error){
                console.log('submit()', values)
                const imgs = this.pw.current.getImgs()
                console.log('imgs', imgs)
                alert('发送ajax请求')
            }
        })
    }

    render() {

        const title = (
            <div style={{color:'#1da57a', marginRight:15, fontSize:20, blockSize:40}}>
                血液检测
            </div>
        )    

        return (
            <div>
                <Card className="blood-check">
                    <List itemLayout="vertical">
                        <Item>
                            <span className="left">上传图片</span>
                            <PicturesWall ref={this.pw}/>
                        </Item>
                        <Item>
                        <span className="left">结果显示</span>
                        </Item>
                    </List>
                </Card>
                
            </div>
        )
    }
}
