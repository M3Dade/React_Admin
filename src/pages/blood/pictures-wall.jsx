import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from '../../api/index'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,    //是否大图预览Modal
    previewImage: '',   //大图的url
    previewTitle: '',   //图片名
    fileList: [
      // {
      //   uid: '-1',  //每个file都有自己唯一的id
      //   name: 'image.png',  //图片文件名
      //   status: 'done',   //图片状态
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
      // {
      //   uid: '-2',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
      
    ],
  };
  //隐藏modal
  handleCancel = () => this.setState({ previewVisible: false });

  //显示指定file对应的大图
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  /**
   * file:当前操作的图片文件（上传/删除）
   * fileList:所有已上传图片文件对象的数组
   */
  handleChange = async({ file, fileList }) => {
    console.log('handleChange()', file.status, fileList.length ,file === fileList[fileList.length-1])
    // 一旦上传成功， 江当前上传的file的信息修正（name， url）
    if(file.status === 'done'){
      const result =  file.response
      if(result.code === 200){
        message.success('上传图片成功！')
        const{fileName, url} = result.data
        file = fileList[fileList.length-1]
        file.name = fileName;
        file.url = url;
      }else{
        message.error('上传图片失败！')
      }
    }else if(file.status === 'removed'){  //删除图片
      const result =await reqDeleteImg(file.name)
      console.log('result.code', result.code)
      if(result.status === 200){
        message.success('删除图片成功！')
      }else{
        message.error('删除图片失败')
      }
    }

    //在操作（上传/删除过程中更新filelist状态）
    this.setState({ fileList })
  };

  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/upload/img"     /*上传图片接口 */
          accept="image/*"         /*接收格式 */
          listType="picture-card"  /*上传列表的样式 */
          name="file"              /*请求参数吗 默认name */
          fileList={fileList}      /*所有已上传图片文件对象的数组 */
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}


