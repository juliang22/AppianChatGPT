import { getDocument } from "pdfjs-dist";
import React, {Component} from 'react';
import {render} from 'react-dom';
import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

// Set the workerSrc property
getDocument.GlobalWorkerOptions.workerSrc = pdfjsWorker;

async function pdfToText(data) {
  console.log("data");
  console.log(data);
  // error is here 
    // Deprecated API usage: No "GlobalWorkerOptions.workerSrc" specified.
  const pdf = await getDocument({ data }).promise;
  const numPages = pdf.numPages;
  let text = "";

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str);
    text += strings.join(" ");
  }
  console.log("pdfToText");
  console.log(pdfToText);
  return text;
}

class PDFUpload extends Component{

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
      
      // var data = this.convertContent(this.fileContent);
      var data = this.convertContent(reader.result);
      console.log(data);
      if (data) {
        this.setState({fileContent: data});
      }
      console.log(this.fileContent);
      console.log("ConvertContent after");

      console.log(this.fileName);
      console.log(this.fileContent);
      // this.setState({fileName: file.name, fileContent: reader.result});
    }
    reader.onerror = () => {
      console.log('file error', reader.error);
    }
  }

  convertContent(data) {
    console.log("ConvertContent during");
    console.log(data);

    const uint8Array = new Uint8Array(
        data.split("").map((char) => char.charCodeAt(0))
      );


    pdfToText(uint8Array)
      .then((text) => {
        // this.setState({fileContent: text});
        console.log(text);
        return(text);
      })
      .catch((error) => {
        console.error("Error converting PDF to text:", error);
      });
  }

  render() {
    return (
      <div>
      <h1>PDF file reader</h1>
      <input type="file" onChange={this.handleFileChange}></input>
      <br/>
      <p>{this.state.fileName} </p>
      <p>{this.state.fileContent} </p>
      </div>
    );
  }
}

export default PDFUpload;

