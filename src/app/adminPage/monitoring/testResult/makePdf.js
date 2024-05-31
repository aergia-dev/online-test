'use client'

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactDOMServer from 'react-dom/server'
import { RenderQuestionPrint } from "@/app/common/renderQuestion";
import SurveyPreview from "@/app/component/surveyPreview";

async function ttt(testFn, tt) {

  if (window.MathJax) {
    await window.MathJax.typesetPromise();
    alert('@@@@@@@@@@@@@@@@2 MathJax rendering complete');
    testFn(tt);
  } else {
    console.error('MathJax not loaded');
  }

  console.log('ddoc', window.document);
}

async function testFn(tt) {
  const tempDiv = document.createElement('div');
  tempDiv.style.width = '210mm';
  tempDiv.style.height = '297mm';
  tempDiv.style.padding = '20mm';
  tempDiv.style.transform = 'scale(0.5)';

  // const htmlString = ReactDOMServer.renderToStaticMarkup(tt);
  const htmlString = ReactDOMServer.renderToStaticMarkup(tt);
  tempDiv.innerHTML = tt;
  document.body.appendChild(tempDiv);

  const canvas = await html2canvas(tempDiv);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgProps = pdf.getImageProperties(imgData);

  console.log('img width,height', imgProps.width, imgProps.height);
  console.log('pdf width,height', pdfWidth, pdfHeight);

  const scaleFactor = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height) * 0.5;
  const newImgWidth = imgProps.width * scaleFactor;
  const newImgHeight = imgProps.height * scaleFactor;

  const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, newImgWidth, newImgHeight);
  heightLeft -= pdfHeight;
  const fileName = 'question'; //userInfo.userName;
  pdf.save(fileName + '.pdf');

}

export async function makeQuestionPdf(userInfo, question) {
  console.log('makeQuestionPdf', question)
  console.log('window', window)
  console.log('window.MathJax', window.MathJax)

  const tempDiv = document.createElement('div');
  tempDiv.style.width = '210mm';
  tempDiv.style.height = '297mm';
  tempDiv.style.padding = '20mm';
  tempDiv.style.transform = 'scale(0.5)';

  const content = RenderQuestionPrint(question.question, null, null, testFn);
  // ttt(testFn, tt);
  // testFn(tt);

  await window.MathJax.typesetPromise();

  const htmlString = ReactDOMServer.renderToStaticMarkup(content);
  tempDiv.innerHTML = htmlString;
  document.body.appendChild(tempDiv);
  const canvas = await html2canvas(tempDiv);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgProps = pdf.getImageProperties(imgData);

  console.log('img width,height', imgProps.width, imgProps.height);
  console.log('pdf width,height', pdfWidth, pdfHeight);

  const scaleFactor = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height) * 0.5;
  const newImgWidth = imgProps.width * scaleFactor;
  const newImgHeight = imgProps.height * scaleFactor;

  const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, newImgWidth, newImgHeight);
  heightLeft -= pdfHeight;
  const fileName = 'question'; //userInfo.userName;
  pdf.save(fileName + '.pdf');



  // const imgData = canvas.toDataURL('image/png');

  // const pdf = new jsPDF('p', 'mm', 'a4');
  // const pdfWidth = pdf.internal.pageSize.getWidth();
  // const pdfHeight = pdf.internal.pageSize.getHeight();
  // const imgProps = pdf.getImageProperties(imgData);

  // console.log('img width,height', imgProps.width, imgProps.height);
  // console.log('pdf width,height', pdfWidth, pdfHeight);

  // const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

  // let heightLeft = imgHeight;
  // let position = 0;

  // pdf.addImage(imgData, 'PNG', 0, position, imgProps.width / 4, imgProps.height / 4);
  // heightLeft -= pdfHeight;
  // const fileName = 'question'; //userInfo.userName;
  // pdf.save(fileName + '.pdf');

  // 임시 DOM 요소 제거
  // document.body.removeChild(tempDiv);

}


export async function makeSurveyPdf(userInfo, survey) {
  console.log('makeSurveyPdf', makeSurveyPdf)

  const tempDiv = document.createElement('div');
  const htmlString = ReactDOMServer.renderToStaticMarkup(<SurveyPreview content={survey} />);
  tempDiv.innerHTML = htmlString;
  document.body.appendChild(tempDiv);

  const canvas = await html2canvas(tempDiv);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgProps = pdf.getImageProperties(imgData);
  console.log('img width,height', imgProps.width, imgProps.height);
  const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft >= 0) {
    position -= pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;
  }


  const fileName = 'survey'; //userInfo.userName;
  pdf.save(fileName + '.pdf');

  // document.body.removeChild(tempDiv);
}


// export function makeQuestionPreview(userInfo, questions, answer) {

//     const findAnswer = (uuid) => {
//         const item = answer.filter(a => a.uuid === uuid);
//         return item.answer;
//     };

//     console.log("q", questions)

//     return (
//         <div id='questionPreview'
//             className="flex flex-col">
//             <div className='mx-auto'>
//                 {userInfo.userName + ' ' + userInfo?.userAffiliation};
//             </div>
//             <div className='py-4 space-y-4 mx-auto'>
//                 {questions &&
//                     (questions.map(({ uuid, question, selection, selectedAnswer }, qIdx) => (
//                         <div className=''
//                             key={uuid}>
//                             <p>{(qIdx + 1) + '. ' + question}</p>
//                             {selection.map(({ idx, item }) => (
//                                 ((selectedAnswer === idx) ?
//                                     <p className='ml-4 text-red-400'
//                                         key={uuid + idx}>
//                                         {idx + ". " + item}
//                                     </p>
//                                     :
//                                     <p className='ml-4'
//                                         key={uuid + idx}>
//                                         {idx + ". " + item}
//                                     </p>
//                                 ))
//                             )}
//                         </div>
//                     )))}
//             </div>
//         </div>);
// }

// export function MakeQuestionPreview2({ userInfo, questions, answer }) {

//     const findAnswer = (uuid) => {
//         const item = answer.filter(a => a.uuid === uuid);
//         return item.answer;
//     };

//     console.log("q", questions)

//     return (
//         <Document>
//             <Page size='A4' style={''}>
//                 <View>
//                     <div id='questionPreview'
//                         className="flex flex-col">
//                         <div className='mx-auto'>
//                             {userInfo.userName + ' ' + userInfo?.userAffiliation};
//                         </div>
//                         <div className='py-4 space-y-4 mx-auto'>
//                             {questions &&
//                                 (questions.map(({ uuid, question, selection, selectedAnswer }, qIdx) => (
//                                     <div className=''
//                                         key={uuid}>
//                                         <p>{(qIdx + 1) + '. ' + question}</p>
//                                         {selection.map(({ idx, item }) => (
//                                             ((selectedAnswer === idx) ?
//                                                 <p className='ml-4 text-red-400'
//                                                     key={uuid + idx}>
//                                                     {idx + ". " + item}
//                                                 </p>
//                                                 :
//                                                 <p className='ml-4'
//                                                     key={uuid + idx}>
//                                                     {idx + ". " + item}
//                                                 </p>
//                                             ))
//                                         )}
//                                     </div>
//                                 )))}
//                         </div>
//                     </div>
//                 </View>
//             </Page>
//         </Document>
//     );
// }

// export function makeQuestionPdf(userInfo, question, answer, element) {
//     function canvasToPdf(canvas) {
//         // PDF 문서 생성
//         const doc = new jsPDF();

//         // Canvas를 이미지로 변환하여 PDF에 추가
//         const imgData = canvas.toDataURL('image/jpeg');
//         doc.addImage(imgData, 'JPEG', 10, 10);

//         // PDF 다운로드
//         doc.save('example.pdf');
//     }

//     const ele = makeQuestionPreview(userInfo, question.questions, answer);
//     console.log('ele', ele);
//     html2canvas(ele).then(canvas => {
//         //canvasToPdf(canvas);
//         document.body.appendChild(canvas);
//     })
// }

// export function makeSurveyPdf(userInfo, survey) {

// }

export async function mqp(userInfo, element) {
  console.log("1", document.getElementById('questionPdf'))
  console.log("2", element)

  // .forEach(el =>
  //   el.style.setProperty("display", "none", "important"));

  const canvas = await html2canvas(element, { logging: true, allowTaint: true, useCORS: true });
  const imgData = canvas.toDataURL('image/png');

  var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  window.location.href = image;

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgProps = pdf.getImageProperties(imgData);

  console.log('img width,height', imgProps.width, imgProps.height);
  console.log('pdf width,height', pdfWidth, pdfHeight);

  const scaleFactor = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height) * 0.5;
  const newImgWidth = imgProps.width * scaleFactor;
  const newImgHeight = imgProps.height * scaleFactor;

  const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, newImgWidth, newImgHeight);
  heightLeft -= pdfHeight;
  const fileName = 'question'; //userInfo.userName;
  pdf.save(fileName + '.pdf');
}

