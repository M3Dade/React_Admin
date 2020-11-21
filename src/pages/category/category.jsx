import React, { Component } from 'react'
import{
    Card,
    Table,
    Button,
    message,
    Modal
}from 'antd'

import {PlusOutlined,DoubleRightOutlined} from '@ant-design/icons';
import LinkButton from '../../compmont/link-button'
import {reqCategorys, reqUpdateCategorys, reqAddCategorys} from '../../api'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'
import './category.less'

export default class Category extends Component {
    
    //放在state里 state改变 会重新render
    state = {
        loading:false, //是否正在获取数据
        categorys:[], //一级分类列表 dataSourse
        subCategorys:[], //二级分类列表
        parentId:0, //当前需要显示的分类列表的父分类ID
        parentName: '',//当前需要显示的分类列表的父分类名称
        showStatus:0, //标识添加/更新的确认框是否显示 0：都不显示，1：显示添加，2：显示修改
    }
    
    /**
     * 初始化table所有列的数组
     */
    initColumns = () =>{
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',    //显示数据对应的属性名
            },
            {
                title: '操作',
                width:300,
                render: (category) => (     //返回需要显示的界面标签
                    <span>
                        <LinkButton onClick={() =>this.showUpdateModal(category)}>修改分类</LinkButton>
                        {/*如何向事件回调函数传递参数：先定义一个匿名函数，在函数调用处理的函数并传入数据 */}
                        {this.state.parentId=== 0 ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null} {/*点击的时候才调用*/}
                        {/* <LinkButton onClink={this.showSubCategorys(category)}>查看子分类</LinkButton> //渲染的时候就被调用了 */}
                    </span>
                )
            },
        ];
    }

    /**
     *异步获取一级/二级分类列表显示 
     *parentId: 没有指定 根据state里的parentId，指定了根据指定的请求
     */
    getCategorys = async (parentId) =>{
        //发请求前 显示loading
        this.setState({loading:true})
        // const {parentId} = this.state
        parentId = parentId || this.state.parentId
        //发送异步ajax请求 获取数据
        const result = await reqCategorys(parentId)    //await promise对象
        //请求完成后，隐藏loading
        this.setState({loading:false})
        const response = result.data
        if(response.status === 0){
            //取出分类数组 （一级/二级
            const categorys = response.data
            if(parentId === 0){
                //更新一级分类状态
                this.setState({
                    categorys:categorys
                })
            }else{
                //更新二级分类状态
                this.setState({
                    subCategorys:categorys
                })
            }
           
        }else{
            message.error('获取分类列表失败')
        }
    }
    /**
     * 显示指定一级分类列表
     */
    showCategorys = ()=>{
        //更新为一级列表状态
        this.setState({
            parentId:0,
            parentName:'',
            subCategorys:[],
        })
    }

    /**
     * 显示指定一级分类对象的二级子列表
     */
    showSubCategorys = (category) =>{
        // 更新state (setstate是异步更新)
        // setState(updater, [callback])    https://zh-hans.reactjs.org/docs/react-component.html#setstate
        this.setState({
            parentId:category.id,
            parentName:category.name,
        },()=>{ //该回调函数，在状态更新且重新render()后执行
            // console.log('parentId:', this.state.parentId)
            //获取二级分类列表
            this.getCategorys()
        })
        //setState()不能立即获取最新的状态 因为setState()是异步更新状态的
    }
    /**
     * 响应点击取消：隐藏确认框
     */
    handleCancel = () => {
        //清除输入
        this.form.current.resetFields();
        //隐藏
        this.setState({
            showStatus:0
        })
    }
    /**
     * 添加分类
     */
    addCategory =  () => {
        // console.log('addCategory()')
        // 表单验证
        this.form.current.validateFields(async (err, values) => {
            if(!err){
                // 隐藏  确认框
                this.setState({
                    showStatus:0
                })
                //收集数据,并添加分类的请求
                const {parentId, categoryName} = values//this.form.current.getFieldValue()
                //清除输入
                this.form.current.resetFields();
                const result = await reqAddCategorys(categoryName, parentId)
                const response = result.data
                if(response.status == 0){
                    // 添加的分类就是当前分类列表下的分类
                    if(parentId === this.state.parentId){
                    // 重新获取当前分类列表显示
                        this.getCategorys()
                    }else if(parentId === 0){ // 二级分类列表下添加一级分类，重新获取一级分类列表，但不需要显示一级列表
                        this.getCategorys(0)
                    }
                    
                }
            }
        })
    }
     /**
     * 更新分类
     */
    updateCategory =  () => {
        // console.log('updateCategory()')
        // 表单验证
        this.form.current.validateFields(async (err, values) => {
            if(!err){
                 //1.隐藏
                this.setState({
                    showStatus:0
                })
                //准备输入
                const categoryId = this.category.id
                // const categoryName = this.form.current.getFieldValue("categoryName")
                const {categoryName} = values
                //清除输入
                this.form.current.resetFields();
                //2.发请求
                const result = await reqUpdateCategorys({categoryId, categoryName})
                const response = result.data
                if(response.status == 0){
                    //3.重新显示列表
                    this.getCategorys()
                }
            }
        })
    }
    /**
     * 显示add Modal
     */
    showAddModal = () => {
        this.setState({
            showStatus:1
        })
    }
    /**
     * 显示update Modal
     */
    showUpdateModal = (category) => {
        //保存分类对象
        this.category = category
        //更新状态
        this.setState({
            showStatus:2
        })
    }
    /**
     * 为第一次render()准备数据
     */
    componentWillMount(){
        this.initColumns();
    }

    /**
     * 执行异步任务 发送ajax请求
     */
    componentDidMount(){
        //获取一级分类列表
        this.getCategorys();
    }

    render() {  //放入render里 每次重新render 都会重新创建 所以columns不放入render

        //读取state数据
        const {categorys, loading, subCategorys, parentId, parentName,showStatus} = this.state
        //读取指定分类
        const category = this.category || {}    //如果还没有 则指定一个空对象
        //card 左侧
        const title = parentId === 0? <LinkButton>一级分类列表</LinkButton>: (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <DoubleRightOutlined style={{marginRight:5}}/>
                <span>{parentName}</span>
            </span>
        )
        //card 右侧
        const extra = (
            <Button type='primary' onClick={this.showAddModal}>
                <PlusOutlined />
                添加
            </Button>
        )


        return (
            <Card title={title} extra={extra}>
                <Table 
                    bordered = {true}
                    loading = {loading}
                    rowKey = '_id'
                    dataSource={parentId===0? categorys: subCategorys} //数组变量
                    columns={this.columns} 
                    pagination={{defaultPageSize:5, showQuickJumper:true}}
                    className="table-striped-rows"
                />;  

                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    >
                    <AddForm 
                        categorys={categorys} 
                        parentId={parentId}  
                        setForm={(form) => {this.form = form}} 
                    />
                </Modal>

                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                    >
                    <UpdateForm 
                        categoryName={category.name} 
                        setForm={(form) => {this.form = form}} 
                    />
                </Modal>
            </Card>
        )
    }
}
