var fs = require("fs");
var html_to_pdf = require("html-pdf-node");

var htmlRead = fs.readFileSync(
  "Cribis_Approfondito_Accomandita/index.html",
  "utf8"
);
var base64ImageHeader = fs.readFileSync("./logo.png", "base64");
var base64ImageFooter = fs.readFileSync("./Rectangle.png", "base64");

const header = `<img src="data:image/png;base64,${base64ImageHeader}" class="imageHeader" style="padding-left: 45px;">`;

const cssFooter = `<style> .container {display: flex; justify-content: end; align-items: flex-end; width: 100%; padding-right: 5px; margin-top: 140px} .innerContainer {display: flex; justify-content: end; align-items: end; width: fit-content; gap: 3px} .boxNumber {width: 14px; height: 14px; background: #023671; -webkit-print-color-adjust: exact; display: flex; justify-content: center; align-items: center; border-radius: 50%; padding: 5px; margin-bottom: 8px} .boxNumber > h1 {font-size: 8px;color: #fff; } </style>`;

const footer =
  cssFooter +
  `<div class="container" >
  <div class="innerContainer" >
  <img src="data:image/png;base64,${base64ImageFooter}" />
  <div class="boxNumber">
  <h1 class="pageNumber"></h1>
  </div>
  </div>
  </div>
  `;

let options = {
  format: "A4",
  displayHeaderFooter: true,
  headerTemplate: header,
  footerTemplate: footer,
  margin: {
    top: "150px",
    bottom: "150px",
    right: "30px",
    left: "30px",
  },
  printBackground: true,
};

let file = { content: htmlRead };

html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
  fs.writeFileSync("Cribis_Approfondito_Accomandita.pdf", pdfBuffer);
});
