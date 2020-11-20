import React, { Component } from 'react'
import propTypes from 'prop-types'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

/**
 * 更新分类的form组件
 */
export class UpdateForm extends Component {

    static propTypes = {
        categoryName:propTypes.string.isRequired
    }

    render() {
        const {categoryName} = this.props
        return (
            <Form>
                <Item>
                    <Input defaultValue={categoryName} placeholder='请输入分类名称'/>
                </Item>
            </Form>
        )
    }
}

export default UpdateForm
