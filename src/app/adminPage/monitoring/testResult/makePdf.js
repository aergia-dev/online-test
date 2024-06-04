'use client'

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function makeQuestionPdf(userInfo, element) {
  const canvas = await html2canvas(element);  
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgProps = pdf.getImageProperties(imgData);

  const scaleFactor = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height) * 0.5;
  const newImgWidth = imgProps.width * scaleFactor;
  const newImgHeight = imgProps.height * scaleFactor;

  const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, newImgWidth, newImgHeight);
  heightLeft -= pdfHeight;
  const fileName =  '시험지_' + userInfo.userName + '-' + userInfo.userId + '-' + userInfo.userAffiliation;
  pdf.save(fileName + '.pdf');
}

export async function makeSurveyPdf(userInfo, element) {
  console.log('makeSurveyPdf');
  console.log('userinfo', userInfo);
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgProps = pdf.getImageProperties(imgData);

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


  const fileName =  '섦문지_' + userInfo.userName + '-' + userInfo.userId + '-' + userInfo.userAffiliation;
  pdf.save(fileName + '.pdf');

}



