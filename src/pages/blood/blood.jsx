import React, { Component } from 'react'
import  './blood.less'
import PicturesWall from './pictures-wall'
import {
    Card,
    List,
    Button,
    Form,
    message
} from 'antd'
import {Switch,Route,NavLink,Redirect,withRouter} from 'react-router-dom'
import Zmage from 'react-zmage'
import {reqPredict} from '../../api/index'
import { BASE_IMG_URL } from '../../utils/constants'
import Predict from './predict'
const Item = List.Item


class Blood extends Component {
    
    

    constructor(props){
        super(props)
        //创建用来保存ref标签对象的容器
        this.pw = React.createRef()
    }

    state = {
        predict_url:'https://via.placeholder.com/500x60/ffffff?text=Predict%20Picture%20is%20here'
    }

    // showImg = (predict_url)=>Zmage.browsing({src:predict_url})

    // handleClick = (url)=> {
    //     showImg(url)
    // }

    componentWillMount () {
        // 取出携带的sdatatate
        const blood = this.props.location.state  // 如果是添加没值, 否则有值
        console.log("blood  " + blood)
        // 保存是否是更新的标识
        this.isUpdate = !!blood
        // 保存blood(如果没有, 保存是{})
        this.blood = blood || {}
      }

    render() {
        const {blood} = this
        const {imgs} = blood
        console.log("this  " + this)
        let predict_url
        const title = (
            <div style={{color:'#1da57a', marginRight:15, fontSize:20, blockSize:40}}>
                血液检测
            </div>
        )    

        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 2 },  // 左侧label的宽度
            wrapperCol: { span: 8 }, // 右侧包裹的宽度
        }

        const onFinsh = async (values) =>{
            console.log('submit()', values)
            const imgs = this.pw.current.getImgs()
            console.log('imgs', imgs)
            alert('发送图片中，请稍后')
             // 1. 收集数据, 并封装成blood对象
            // const {name, desc, price, categoryIds} = values
            const blood = {imgs}
        
            // 2. 调用接口请求函数去预测图片
            console.log(imgs[0])
            const result = await reqPredict(imgs[0])
            console.log('result.code', result.code)
            console.log("result: " + result)
            
            // 3. 根据结果提示
            if (result.status===200) {
            message.success('生成预测图片中，请稍后')
            // this.props.history.goBack()
            
            const predict = result.data
            const {fileName, url} = predict.data
            predict_url = url
            console.log("predict_url:"+ url)
            this.setState({predict_url:url})
            // this.props.histroy.push('/prediction')
            message.success('请点击按钮查看结果')
            } else {
            message.error("预测发生错误")
            }
        }

        return (
            <div>
                <Card className="blood-check">
                    <List itemLayout="vertical">
                        <Form {...formItemLayout} onFinish = {onFinsh}>
                            <Item>
                                <span className="left">上传图片</span>
                                <PicturesWall ref={this.pw} imgs = {imgs}/>
                                <Form.Item {...formItemLayout}>
                                    <Button type="primary" htmlType="submit" >
                                    提交
                                    </Button>
                                </Form.Item>
                            </Item>
                            <span className="left">结果显示</span>
                            <Predict predict_url={this.state.predict_url}/>
                        </Form>
                    </List>
                </Card>
            </div>
        )
    }
}

export default withRouter(Blood);