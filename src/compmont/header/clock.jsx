import React, { Component } from 'react'

export default class Clock extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            date: new Date()
        }
    }
    //组件已经被渲染到 DOM 中后运行
    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(),1000
        )
    }

    //组件从 DOM 中被移除
    componentWillUnmount(){
        clearInterval(this.timerID)
    }

    tick(){
        this.setState({
            date: new Date()
        })
    }

    render() {
        return (
            <div style={{marginRight:0}}>
                {this.state.date.toLocaleDateString()}
                &nbsp;
                {this.state.date.toTimeString()}
            </div>
        )
    }
}
