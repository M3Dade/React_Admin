import React, { Component } from 'react'
import './index.less'

/*
    外形像链接的按钮
*/
export default function LinkButton(props){
    return <button {...props} className="link-button"></button>  //...{} 拆开 分别使用
}
