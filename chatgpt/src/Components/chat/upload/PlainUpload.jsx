import React, {Component} from 'react';

class PlainUpload extends Component{
  constructor(props){
    super(props);
    this.state={
      fileName: '',
      fileContent:''
    };
  }

  handleFileChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      this.setState({fileName: file.name, fileContent: reader.result});
    }
    reader.onerror = () => {
      console.log('file error', reader.error);
    }
  }

  render() {
    return (
      <div>
      <input type="file" onChange={this.handleFileChange}></input>
      <br/>
      <p>{this.state.fileName} </p>
      <p>{this.state.fileContent} </p>
      </div>
    );
  }
}

export default PlainUpload;