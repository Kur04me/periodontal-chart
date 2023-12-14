import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Head from "next/head";

const Home = () => {
  return (
    <>
    <Head>
      <title>Periodontal Chart</title>
      <meta name="description" content="歯周組織検査表を作れます" />
    </Head>
      <div id="App">
        <Menu />
        <div id="main-container">
          <Header />
          <Content />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
