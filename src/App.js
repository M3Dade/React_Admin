import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.less'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <Switch> {/*只匹配一个 */}
          <Route path='/' component={Login}></Route>
          <Route path='/login' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
