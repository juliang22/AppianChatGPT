import React, {Component} from 'react';
// import FileInput from './FileInput';
import PDFUpload from './PDFUpload';
import ReadPDF from './ReadPDF';

function getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

function isImage(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
      //etc
      return true;
    default:
      return false;
  }
  // return false;
}

function isDocx(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'docx':
      //etc
      return true;
    default:
      return false;
  }
}

export function getFileType(filename) {
  if(filename==="") { return filename; }
  var ext = getExtension(filename);
  console.log(ext.toLowerCase());
  return (ext.toLowerCase());
}

// export default function inputHandler(fileName) {
//   if (isDocx(getExtension(fileName))) {
//     return true;
//   } else {
//     return false;
//   }
// }
class Input extends Component{
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
    var fileType = getFileType(this.state.fileName);
    retunr (
        <div>
            <ReadPDF/>
        </div>
    )
    //  switch(fileType) {
    //   case 'txt':
    //     return(
    //       <div>
    //         <h1>plain</h1>
    //         <FileInput/>
    //       </div>
    //     );
    //   case 'csv':
    //     // continue
    //     return(
    //       <div>
    //         <h1>plain</h1>
    //         <FileInput/>
    //       </div>
    //     );
    //   case 'pdf':
    //     // process pdf content
    //     return(
    //       <div>
    //         <h1>pdf</h1>
    //         <FileInput/>
    //       </div>
    //     );
    //   case 'docx':
    //     // process docx content
    //     return(
    //       <div>
    //         <h1>docx</h1>
    //         <FileInput/>
    //       </div>
    //     );
    //   default:
    //     // continue
    //     return(
    //       <div>
    //         <h1>defualt</h1>
    //         <FileInput/>
    //       </div>
    //     );
    // }
    
  }

  
  // file name passed in through props


}

export default Input;