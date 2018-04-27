import React from 'react';
import { Upload, Icon, Modal } from 'antd';

export default class ComponePictures extends React.Component {
  constructor() {
		super();
		this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
		};
  };

  _handleCancel () {
    this.setState({ previewVisible: false })
  }

  _handlePreview (file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  _handleChange (info) {
    let fileList = info.fileList;
    const fileIdList = [];
    //将已上传文件添加到记录
    this.setState({ fileList })
    console.log(fileList[0])
    if (fileList.length >= 1 && fileList[0].response ) {
      for (var i = 0; i < fileList.length;i++) {
        console.log(i)
        fileIdList.push(fileList[i].response.data.image_src)
      }
      console.log(fileList[0])
      this.props.handleChildValueChange(fileIdList)
    }else {
      this.props.handleChildValueChange(fileIdList)
    }
  }

  _onRemove (file) {
    const data = {url:file.response.msg};
    const myFetchOptions = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      mode : 'cors',
      body: JSON.stringify(data)
    };
    console.log(file.response.msg)
    if (data.url) {
      fetch("http://localhost:8100/picture/remove",myFetchOptions)
        .then((res) => {
          if (res.ok) {
             message.success('删除成功！');
          }else {
             message.error('删除失败！');
          }
        })
    } else {
      console.log('Url为空')
    }

  }


  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="http://localhost:8100/picture/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this._handlePreview.bind(this)}
          onChange={this._handleChange.bind(this)}
          onRemove={this._onRemove.bind(this)}
        >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this._handleCancel.bind(this)}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
