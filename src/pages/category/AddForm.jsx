import React, { Component } from 'react'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

/**
 * 添加分类的form组件
 */
export class AddForm extends Component {
    render() {
        return (
            <Form>
                <Item>
                    <Select placeholder="请选择父分类">
                        <Option value='0'>一级分类</Option>
                        <Option value='1'>电脑</Option>
                        <Option value='2'>图书</Option>
                    </Select>
                </Item>
                <Item>
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        )
    }
}

export default AddForm
