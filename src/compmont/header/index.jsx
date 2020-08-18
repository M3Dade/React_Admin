import React, { Component } from 'react'
import moduleName from '../header/index.less'

export default class Header extends Component {
    render() {
        return (
           <div className="header">
               <div className="header-top">
                   <span>欢迎，admin</span>
               </div>
               <div className="header-bottem"></div>
           </div>
        )
    }
}
