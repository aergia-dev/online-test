import jsPDF from "jspdf";
import { maruburiRegular } from './font'
import html2canvas from "html2canvas";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export function makeQuestionPreview(userInfo, questions, answer) {

    const findAnswer = (uuid) => {
        const item = answer.filter(a => a.uuid === uuid);
        return item.answer;
    };

    console.log("q", questions)

    return (
        <div id='questionPreview'
            className="flex flex-col">
            <div className='mx-auto'>
                {userInfo.userName + ' ' + userInfo?.userAffiliation};
            </div>
            <div className='py-4 space-y-4 mx-auto'>
                {questions &&
                    (questions.map(({ uuid, question, selection, selectedAnswer }, qIdx) => (
                        <div className=''
                            key={uuid}>
                            <p>{(qIdx + 1) + '. ' + question}</p>
                            {selection.map(({ idx, item }) => (
                                ((selectedAnswer === idx) ?
                                    <p className='ml-4 text-red-400'
                                        key={uuid + idx}>
                                        {idx + ". " + item}
                                    </p>
                                    :
                                    <p className='ml-4'
                                        key={uuid + idx}>
                                        {idx + ". " + item}
                                    </p>
                                ))
                            )}
                        </div>
                    )))}
            </div>
        </div>);
}

export function makeQuestionPreview2(userInfo, questions, answer) {

    const findAnswer = (uuid) => {
        const item = answer.filter(a => a.uuid === uuid);
        return item.answer;
    };

    console.log("q", questions)

    return (
        <Document>
            <Page size='A4' style={''}>
                <View>
                    <div id='questionPreview'
                        className="flex flex-col">
                        <div className='mx-auto'>
                            {userInfo.userName + ' ' + userInfo?.userAffiliation};
                        </div>
                        <div className='py-4 space-y-4 mx-auto'>
                            {questions &&
                                (questions.map(({ uuid, question, selection, selectedAnswer }, qIdx) => (
                                    <div className=''
                                        key={uuid}>
                                        <p>{(qIdx + 1) + '. ' + question}</p>
                                        {selection.map(({ idx, item }) => (
                                            ((selectedAnswer === idx) ?
                                                <p className='ml-4 text-red-400'
                                                    key={uuid + idx}>
                                                    {idx + ". " + item}
                                                </p>
                                                :
                                                <p className='ml-4'
                                                    key={uuid + idx}>
                                                    {idx + ". " + item}
                                                </p>
                                            ))
                                        )}
                                    </div>
                                )))}
                        </div>
                    </div>
                </View>
            </Page>
        </Document>
    );
}

export function makeQuestionPdf(userInfo, question, answer, element) {
    function canvasToPdf(canvas) {
        // PDF 문서 생성
        const doc = new jsPDF();

        // Canvas를 이미지로 변환하여 PDF에 추가
        const imgData = canvas.toDataURL('image/jpeg');
        doc.addImage(imgData, 'JPEG', 10, 10);

        // PDF 다운로드
        doc.save('example.pdf');
    }

    const ele = makeQuestionPreview(userInfo, question.questions, answer);
    console.log('ele', ele);
    html2canvas(ele).then(canvas => {
        //canvasToPdf(canvas);
        document.body.appendChild(canvas);
    })
}

export function makeSurveyPdf(userInfo, survey) {

}