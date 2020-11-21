import React, { Component } from 'react'
import {
    Form,
    Select,
    Input
} from 'antd'
import propTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option




/**
 * 添加分类的form组件
 */
export class AddForm extends Component {

    formRef = React.createRef();

    static propTypes = {
        categorys: propTypes.array.isRequired, //一级分类数组
        parentId:propTypes.string.isRequired, //父分类Id
        categoryName:propTypes.string.isRequired,
        setForm:propTypes.func.isRequired,
    }

    componentDidMount(){
        this.formRef.current.setFieldsValue({
            parentId:this.props.parentId,
        });
    }
    
    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            parentId:this.props.parentId,
        });
        
    }

    componentWillMount(){
        //form对象通过setForm()传递父组件
        this.props.setForm(this.formRef)
    }


    onFinish = values => {
        console.log('Received values of form: ', values);
      };

    render() {

        const {categorys, parentId} = this.props

        return (
            <Form  className="add-form"
                ref={this.formRef} 
                onFinish={this.onFinish}>
                <Item  name="parentId"
                    rules={[{ required: true}]}>
                    <Select placeholder="请选择父分类">
                        <Option value='0'>一级分类</Option>{
                            categorys.map(c => <Option value={c.id}>{c.name}</Option>)
                        }
                    </Select>
                </Item>
                <Item  name="categoryName"
                    rules={[{ required: true, message: '分类名称必须输入' }]}>
                    <Select placeholder="请输入分类名称">
                        <Option value='0'>一级分类</Option>{
                            categorys.map(c => <Option value={c.id}>c.name</Option>)
                        }
                    </Select>
                </Item>
            </Form>
        )
    }
}

export default AddForm
