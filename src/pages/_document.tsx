import { Head, Html, Main, NextScript, DocumentProps } from "next/document";
import { FunctionComponent } from "react";

const Document: FunctionComponent<DocumentProps> = () => (
  <Html className="h-full bg-gray-50 antialiased" lang="en">
    <Head />
    <body className="h-full">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
