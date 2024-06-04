
import Head from 'next/head';

const ExamplePage = () => {
  return (
    <div>
      <Head>
        {/* 이 페이지만을 위한 스크립트 */}
        <script
          async
          src="https://cdn.example.com/example-script.js"
        />
      </Head>
      <div>This is an example page.</div>
    </div>
  );
};

export default ExamplePage;


// import Document, { Html, Head, Main, NextScript } from 'next/document';

// class MyDocument extends Document {
//   render() {
//     return (
//       <Html>
//         <Head>
//           <script
//             async
//             id="MathJax-script"
//             src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
//           />
//           <script
//             dangerouslySetInnerHTML={{
//               __html: `
//                 window.MathJax = {
//                   tex: {
//                     inlineMath: [['$', '$'], ['\\(', '\\)']],
//                   },
//                   svg: {
//                     fontCache: 'global'
//                   }
//                 };
//               `,
//             }}
//           />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;
