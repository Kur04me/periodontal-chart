import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta name="description" content="歯周組織検査表を作れます" />
        <meta
          name="google-site-verification"
          content="xMvlKc-uEIfoV84LZtib4bRsx7zv71DyHkgHWVcY0PI"
        />
        <meta
          name="keywords"
          content="歯周病, 歯周組織検査, 無料, オンラインツール, 歯周病管理"
        />
        <link rel="icon" type="image/ico" href="/src/app/icon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
