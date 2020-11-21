import React, { Component, useState  } from 'react'
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

    formRef = React.createRef();

    static propTypes = {
        categoryName:propTypes.string.isRequired,
        setForm:propTypes.func.isRequired
    }

    componentDidMount(){
        this.formRef.current.setFieldsValue({
            categoryName:this.props.categoryName,
        });
    }
    
    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            categoryName:this.props.categoryName,
        });
        
    }

    componentWillMount(){
        //form对象通过setForm()传递父组件
        this.props.setForm(this.formRef)
    }

    render() {

        // const {categoryName} = this.props
       
        return (
            <Form ref={this.formRef}  >
                <Item name="categoryName" rules={[{ required: true , message:'分类名称必须输入'}]} >
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        )
    }
}

export default UpdateForm

