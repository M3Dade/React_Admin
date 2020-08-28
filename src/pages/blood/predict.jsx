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
import Zmage from 'react-zmage'
import {reqPredict} from '../../api/index'
import { BASE_IMG_URL } from '../../utils/constants'

const Item = List.Item

const MyImage = (props) => {
    return <div><Zmage src={props.predict_url} alt="单击可放大显示"/></div>
}

const showImg = (predict_url)=>Zmage.browsing({src:predict_url})

export default class Predict extends Component {

    

    state = {
        predict_url:'https://via.placeholder.com/500x60/ffffff?text=Predict%20Picture%20is%20here'
    }

    handleClick = () => {
        this.setState({predict_url: this.props.predict_url})
        showImg(this.props.predict_url)
    }

    componentWillMount () {
        this.setState({predict_url: 'https://via.placeholder.com/500x60/ffffff?text=Predict%20Picture%20is%20here'})
    }

    render() {
        return (
            <div>
                <MyImage predict_url={this.state.predict_url} />
                <Button type="primary" onClick={this.handleClick}>显示结果</Button>
            </div>
        );
    }
    
    
}

