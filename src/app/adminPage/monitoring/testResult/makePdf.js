import jsPDF from "jspdf";
import { maruburiRegular } from './font'
import html2canvas from "html2canvas";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import ReactDOMServer from 'react-dom/server'
import { renderQuestionPrint } from "@/app/common/renderQuestion";

export async function makeQuestionPdf(userInfo, question, questionEle) {
    console.log('makeQuestionPdf', question)
    // const PdfDocument = ({ content }) => (
    //     <div style={{ width: '210mm', height: '297mm', padding: '20mm' }}>
    //         <h1>{content.title}</h1>
    //         <p>{content.body}</p>
    //     </div>
    // );

    // const content = {
    //     title: 'A4 크기의 PDF 예제',
    //     body: '이것은 A4 크기의 PDF 예제입니다.'
    // };

    // const htmlString = ReactDOMServer.renderToStaticMarkup(<PdfDocument content={content} />);
    // const htmlString = ReactDOMServer.renderToStaticMarkup(<RenderQuestionPrint questions={question} />);
    // console.log(htmlString);

    // const tempDiv = document.createElement('div');
    // tempDiv.innerHTML = htmlString;
    // document.body.appendChild(tempDiv);


    // questionEle.current = renderQuestionPrint(question); 

    // HTML 요소를 캡처하여 PDF로 변환
    // const canvas = await html2canvas(tempDiv);
    const canvas = await html2canvas(questionEle);
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


    const fileName = 'testing'; //userInfo.userName;
    pdf.save(fileName + '.pdf');

    // 임시 DOM 요소 제거
    // document.body.removeChild(tempDiv);
 
}


export function makeSurveyPdf(userInfo, survey) {

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