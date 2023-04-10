import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";


const ReadPDF = ({ pdfUrl }) => {
  const [pdfText, setPdfText] = useState("");

  useEffect(() => {
    const readPDF = async () => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;

        let textContent = "";

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          textContent += strings.join(" ");
        }

        setPdfText(textContent);
      } catch (error) {
        console.error("Error reading PDF:", error);
      }
    };

    readPDF();
  }, [pdfUrl]);

  return (
    <div>
      <h2>PDF Content:</h2>
      <pre>{pdfText}</pre>
    </div>
  );
};

export default ReadPDF;
