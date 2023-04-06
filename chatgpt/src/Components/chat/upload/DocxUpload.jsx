import React, {Component} from 'react';
// import {render} from 'react-dom';
// import inputHandler from "./Input"
// import getFileType from "./Input"

// function getFileType(filename) {
//   if(filename==="") { return filename; }
//   var ext = getExtension(filename);
//   console.log(ext.toLowerCase());
//   return (ext.toLowerCase());
// }

class FileInput extends Component{
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
    // var fileType = getFileType(this.state.fileName);

    // console.log(inputHandler(this.state.fileName));
    // console.log(getFileType(this.state.fileName));
    // console.log(fileType);
    // switch statement here
    // switch(fileType) {
    //   case 'txt':
    //     // continue
    //   case 'csv':
    //     // continue
    //   case 'pdf':
    //     // process pdf content
    //   case 'docx':
    //     // process docx content
    //   default:
    //     // continue
    // }

    return (
      <div>
      <h1>docx file reader</h1>
      <input type="file" onChange={this.handleFileChange}></input>
      <br/>
      {/* <p>{inputHandler(this.state.fileName)} </p> */}
      <p>{this.state.fileName} </p>
      <p>{this.state.fileContent} </p>
      </div>
    );
  }
}

export default FileInput;